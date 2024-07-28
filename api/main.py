from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse, FileResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests
from dotenv import load_dotenv
import os
import datetime
from lumibot.brokers import Alpaca
from lumibot.backtesting import YahooDataBacktesting
from lumibot.strategies.strategy import Strategy
from datetime import datetime, timedelta

load_dotenv()

"""
FastAPI Setup
"""

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

"""
CONSTANTS
"""

NEWS_API_KEY = os.getenv('NEWS_API_KEY')
LOGS_DIRECTORY = os.path.join(os.path.dirname(__file__), '../logs')
backtest_status = {"status": "idle"}

"""
TYPINGS
"""
class BacktestParameters(BaseModel):
    symbol: str
    year: str
    benchmark: str
    cashAtRisk: str
    apiKey: str
    apiSecret: str

"""
UTIL FUNCTIONS
"""
def fetch_crypto_news(query='cryptocurrency'):
    today = datetime.now()
    startdate = today - timedelta(days=30)
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

def cleanup_logs_files():
    trades_fp = os.path.join(LOGS_DIRECTORY, 'trades.html')
    os.path.join(os.path.dirname(__file__), 'logs')
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

class MLTrader(Strategy):
    def initialize(self, symbol, cash_at_risk=0.5):
        self.symbol = symbol
        self.sleeptime = "24H"
        self.last_trade = None
        self.cash_at_risk = cash_at_risk

    def position_sizing(self):
        cash = self.get_cash()
        last_price = self.get_last_price(self.symbol)
        quantity = int(cash * self.cash_at_risk / last_price)
        return cash, last_price, quantity

    def on_trading_iteration(self):
        cash, last_price, quantity = self.position_sizing()
        if cash > last_price:
            if self.last_trade == None:
                order = self.create_order(
                    self.symbol,
                    quantity,
                    "buy",
                    type="bracket",
                    take_profit_price=last_price*1.2,
                    stop_loss_price=last_price*0.95
                )
                self.submit_order(order)
                self.last_trade = "buy"

def init_broker(alpaca_api_key, alpaca_api_secret):
    ALPACA_CREDS = {
      "API_KEY": alpaca_api_key,
      "API_SECRET": alpaca_api_secret,
      "PAPER": True
    }
    broker = Alpaca(ALPACA_CREDS)
    return broker

async def backtestStrategy(symbol, year, benchmark, cash_at_risk, alpaca_key, alpaca_secret):
  try:
    broker = init_broker(alpaca_key, alpaca_secret)
    strategy = MLTrader(name="mlstrategy",
                        broker=broker,
                        parameters={
                            "symbol": symbol.upper(),
                            "cash_at_risk": cash_at_risk,
                        })
    start_date = datetime(year, 1, 1)
    end_date = datetime(year, 12, 31)
    strategy.backtest(
        YahooDataBacktesting,
        start_date,
        end_date,
        benchmark_asset=benchmark.upper(),
        parameters={
            "symbol": symbol.upper(),
            "cash_at_risk": cash_at_risk,
        },
        show_tearsheet=False,
        show_plot=False
    )
    state = "Completed"
  except:
     state = "Error"
  return state
   
"""
API ENDPOINTS
"""

@app.get("/api/news")
def get_news():
    news, status_code = fetch_crypto_news()
    print("Reached 1")
    if status_code == 429:
        return JSONResponse(content={"error": "Rate limit exceeded. Please try again later."}, status_code=429)
    processed_news = process_news(news)
    return JSONResponse(content=processed_news)

@app.post("/api/process")
async def process_data(bp: BacktestParameters):
    try:
        backtest_status["status"] = "running"
        result = await backtestStrategy(bp.symbol, int(bp.year), bp.benchmark, float(bp.cashAtRisk), bp.apiKey, bp.apiSecret)
        backtest_status["status"] = "complete"
        cleanup_logs_files()
        return {"result": result}
    except Exception as e:
        backtest_status["status"] = "error"
        print(f"Error in process_data: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/status")
async def get_status():
    return backtest_status

@app.get("/api/tearsheet")
async def get_tearsheet():
    try:
        file_path = os.path.join(LOGS_DIRECTORY, 'tearsheet.html')
        print(file_path)
        if not os.path.isfile(file_path):
            raise HTTPException(status_code=404, detail="Tearsheet not found")
        return FileResponse(file_path, media_type='text/html', filename='tearsheet.html')
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))    