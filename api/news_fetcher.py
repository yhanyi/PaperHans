from flask import Flask, jsonify, make_response
from flask_cors import CORS
from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from transformers import pipeline
import requests
from dotenv import load_dotenv
import os
import datetime

load_dotenv()

app = FastAPI()

# Allow CORS for all origins
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
    startdate = today - datetime.timedelta(days=60)
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

# @app.route('/api/news', methods=['GET'])
@app.get("/api/news")
def get_news():
    news, status_code = fetch_crypto_news()
    if status_code == 429:
        return make_response(jsonify({"error": "Rate limit exceeded. Please try again later."}), 429)
    processed_news = process_news(news)
    news_with_sentiment = analyze_sentiment(processed_news)
    return jsonify(news_with_sentiment)

if __name__ == '__main__':
    # app.run(debug=True, port=5000)
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=5000)