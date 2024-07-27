from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse, FileResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from transformers import pipeline
import requests
from dotenv import load_dotenv
import os
import datetime
import trading_script as trade
import uvicorn

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

NEWS_API_KEY = os.getenv('NEWS_API_KEY')

sentiment_pipeline = pipeline("sentiment-analysis", model="ProsusAI/finbert")

def fetch_crypto_news(query='cryptocurrency'):
    today = datetime.date.today()
    startdate = today - datetime.timedelta(days=30)
    url = f'https://newsapi.org/v2/everything?q={query}&from={startdate.strftime("%Y-%m-%d")}&sortBy=publishedAt&apiKey={NEWS_API_KEY}&language=en'
    response = requests.get(url)
    if response.status_code == 429:
        return None, response.status_code
    data = response.json()
    return data['articles'], response.status_code

def process_news(news):
    processed_news = []
    for item in news:
        processed_news.append({
            "title": item.get("title", "No Title"),
            "info": item.get("description", "No Description"),
            "url": item.get("url", "No URL")
        })
    return processed_news

def analyze_sentiment(news):
    for item in news:
        try:
            sentiment = sentiment_pipeline(item['info'])
            item['sentiment'] = sentiment[0]['label'].capitalize()
        except:
            item['sentiment'] = 'Error'
    return news

@app.get("/api/news")
def get_news():
    news, status_code = fetch_crypto_news()
    if status_code == 429:
        return JSONResponse(content={"error": "Rate limit exceeded. Please try again later."}, status_code=429)
    processed_news = process_news(news)
    news_with_sentiment = analyze_sentiment(processed_news)
    return JSONResponse(content=news_with_sentiment)

class BacktestParameters(BaseModel):
    symbol: str
    year: str
    benchmark: str
    cashAtRisk: str
    userId: str

# Caches backtesting status
backtest_status = {"status": "idle"}

@app.post("/api/process")
async def process_data(bp: BacktestParameters):
    print(f"Received request with parameters: {bp}")  # Add this line
    try:
        backtest_status["status"] = "running"
        result = await trade.backtestStrategy(bp.symbol, int(bp.year), bp.benchmark, float(bp.cashAtRisk), bp.userId)
        backtest_status["status"] = "complete"
        cleanup_logs_files()
        return {"result": result}
    except Exception as e:
        backtest_status["status"] = "error"
        print(f"Error in process_data: {str(e)}")  # Add this line
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/status")
async def get_status():
    return backtest_status

LOGS_DIRECTORY = os.path.join(os.path.dirname(__file__), 'logs')

def cleanup_logs_files():
    trades_fp = os.path.join(LOGS_DIRECTORY, 'trades.html')
    tearsheet_fp = os.path.join(LOGS_DIRECTORY, 'tearsheet.html')
    if os.path.isfile(trades_fp):
        os.remove(trades_fp)
    if os.path.isfile(tearsheet_fp):
        os.remove(tearsheet_fp)
    files = os.listdir(LOGS_DIRECTORY)
    for file in files:
        file_path = os.path.join(LOGS_DIRECTORY, file)
        if not file.endswith(".html"):
            os.remove(file_path)
        elif "trades" in file:
            new_file_path = os.path.join(LOGS_DIRECTORY, 'trades.html')
            os.rename(file_path, new_file_path)
        elif "tearsheet" in file:
            new_file_path = os.path.join(LOGS_DIRECTORY, 'tearsheet.html')
            os.rename(file_path, new_file_path)
        
@app.get("/api/tearsheet")
async def get_tearsheet():
    try:
        file_path = os.path.join(LOGS_DIRECTORY, 'tearsheet.html')
        if not os.path.isfile(file_path):
            raise HTTPException(status_code=404, detail="Tearsheet not found")
        return FileResponse(file_path, media_type='text/html', filename='tearsheet.html')
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == '__main__':
    uvicorn.run(app, host="0.0.0.0", port=8000)


# from flask import Flask, jsonify, make_response
# from flask_cors import CORS
# from transformers import pipeline
# import requests
# from dotenv import load_dotenv
# import os
# import datetime
# from fastapi import FastAPI, HTTPException
# from fastapi.responses import FileResponse
# from fastapi.middleware.cors import CORSMiddleware
# from pydantic import BaseModel
# import trading_script as trade
# import uvicorn
# # from multiprocessing import Process

# load_dotenv()

# app = FastAPI()

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# NEWS_API_KEY = os.getenv('NEWS_API_KEY')

# sentiment_pipeline = pipeline("sentiment-analysis", model="ProsusAI/finbert")

# def fetch_crypto_news(query='cryptocurrency'):
#     today = datetime.date.today()
#     startdate = today - datetime.timedelta(days=30)
#     url = f'https://newsapi.org/v2/everything?q={query}&from={startdate.strftime("%Y-%m-%d")}&sortBy=publishedAt&apiKey={NEWS_API_KEY}&language=en'
#     response = requests.get(url)
#     if response.status_code == 429:
#         return None, response.status_code
#     data = response.json()
#     return data['articles'], response.status_code

# def process_news(news):
#     processed_news = []
#     for item in news:
#         processed_news.append({
#             "title": item.get("title", "No Title"),
#             "info": item.get("description", "No Description"),
#             "url": item.get("url", "No URL")
#         })
#     return processed_news

# def analyze_sentiment(news):
#     for item in news:
#         try:
#             sentiment = sentiment_pipeline(item['info'])
#             item['sentiment'] = sentiment[0]['label'].capitalize()
#         except:
#             item['sentiment'] = 'Error'
#     return news

# @app.get("/api/news")
# def get_news():
#     news, status_code = fetch_crypto_news()
#     if status_code == 429:
#         return make_response(jsonify({"error": "Rate limit exceeded. Please try again later."}), 429)
#     processed_news = process_news(news)
#     news_with_sentiment = analyze_sentiment(processed_news)
#     print(news_with_sentiment)
#     return make_response(jsonify(news_with_sentiment))

# class BacktestParameters(BaseModel):
#     symbol: str
#     year: str
#     benchmark: str
#     cashAtRisk: str
#     userId: str

# # Caches backtesting status
# backtest_status = {"status": "idle"}

# @app.post("/api/process")
# # flask_app.route('/process', methods=['POST'])
# async def process_data(bp: BacktestParameters):
#     print(f"Received request with parameters: {bp}")  # Add this line
#     try:
#         backtest_status["status"] = "running"
#         result = await trade.backtestStrategy(bp.symbol, int(bp.year), bp.benchmark, float(bp.cashAtRisk), bp.userId)
#         backtest_status["status"] = "complete"
#         cleanup_logs_files()
#         return {"result": result}
#     except Exception as e:
#         backtest_status["status"] = "error"
#         print(f"Error in process_data: {str(e)}")  # Add this line
#         raise HTTPException(status_code=500, detail=str(e))

# @app.get("/api/status")
# async def get_status():
#     return backtest_status

# LOGS_DIRECTORY = os.path.join(os.path.dirname(__file__), 'logs')

# def cleanup_logs_files():
#     trades_fp = os.path.join(LOGS_DIRECTORY, 'trades.html')
#     tearsheet_fp = os.path.join(LOGS_DIRECTORY, 'tearsheet.html')
#     if os.path.isfile(trades_fp):
#         os.remove(trades_fp)
#     if os.path.isfile(tearsheet_fp):
#         os.remove(tearsheet_fp)
#     files = os.listdir(LOGS_DIRECTORY)
#     for file in files:
#         file_path = os.path.join(LOGS_DIRECTORY, file)
#         if not file.endswith(".html"):
#             os.remove(file_path)
#         elif "trades" in file:
#             new_file_path = os.path.join(LOGS_DIRECTORY, 'trades.html')
#             os.rename(file_path, new_file_path)
#         elif "tearsheet" in file:
#             new_file_path = os.path.join(LOGS_DIRECTORY, 'tearsheet.html')
#             os.rename(file_path, new_file_path)
        
# # @fastapi_app.get("/api/tearsheet")
# @app.get("/api/tearsheet")
# async def get_tearsheet():
#     try:
#         file_path = os.path.join(LOGS_DIRECTORY, 'tearsheet.html')
#         if not os.path.isfile(file_path):
#             raise HTTPException(status_code=404, detail="Tearsheet not found")
#         return FileResponse(file_path, media_type='text/html', filename='tearsheet.html')
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))

# # Start Flask and FastAPI in parallel
# # def start_flask():
# #     flask_app.run(host="0.0.0.0", port=5000)

# # def start_fastapi():
# #     uvicorn.run(fastapi_app, host="0.0.0.0", port=8000)
# if __name__ == '__main__':
#     import uvicorn    
#     uvicorn.run(app, host="127.0.0.1", port=8000)
# # if __name__ == "__main__":
# #     flask_app.run(debug=True, port=8000)
# #     # flask_process = Process(target=start_flask)
# #     # fastapi_process = Process(target=start_fastapi)

# #     # flask_process.start()
# #     # fastapi_process.start()

# #     # flask_process.join()
# #     # fastapi_process.join()
