from lumibot.brokers import Alpaca
from lumibot.backtesting import YahooDataBacktesting
from lumibot.strategies.strategy import Strategy
# from lumibot.traders import Trader
# from lumibot.entities import Asset
from datetime import datetime, timedelta
from modelzoo import finbert_estimate_sentiment
from dotenv import load_dotenv
from alpaca_trade_api.rest import REST
from os import getenv
import json
from firebase_admin import credentials, initialize_app, firestore
from dotenv import load_dotenv

load_dotenv()

firebase_config = json.loads(getenv("FIREBASE_JSON"))
cred = credentials.Certificate(firebase_config)
initialize_app(cred)
db = firestore.client()

def get_alpaca_keys(uid):
    try:
        doc_ref = db.collection("alpacaKeys").document(uid)
        doc = doc_ref.get()
        if doc.exists:
            data = doc.to_dict()
            if data and "apiKey" in data and "apiSecret" in data:
                return data["apiKey"], data["apiSecret"]
            else:
                raise ValueError("Alpaca API keys are incomplete for this user")
        else:
            raise ValueError("No Alpaca API keys found for user")
    
    except Exception as e:
        raise

class MLTrader(Strategy):
    def initialize(self, symbol, cash_at_risk=0.5, alpaca_api_key=None, alpaca_api_secret=None):
        self.symbol = symbol
        self.sleeptime = "24H"
        self.last_trade = None
        self.cash_at_risk = cash_at_risk
        self.api = REST(base_url="https://paper-api.alpaca.markets",
                        key_id=alpaca_api_key,
                        secret_key=alpaca_api_secret)

    def position_sizing(self):
        cash = self.get_cash()
        last_price = self.get_last_price(self.symbol)
        quantity = int(cash * self.cash_at_risk / last_price)
        return cash, last_price, quantity
    
    def get_dates(self):
        today = self.get_datetime()
        three_days = today - timedelta(days=3)
        return today.strftime("%Y-%m-%d"), three_days.strftime("%Y-%m-%d")

    def get_sentiment(self):
        today, three_days = self.get_dates()
        news = self.api.get_news(symbol=self.symbol,
                                 start=three_days,
                                 end=today)
        news = [event.__dict__["_raw"]["headline"] for event in news]
        probability, sentiment = finbert_estimate_sentiment(news)
        return probability, sentiment

    def on_trading_iteration(self):
        cash, last_price, quantity = self.position_sizing()
        probability, sentiment = self.get_sentiment()
        if cash > last_price:
            if sentiment == "positive" and probability > 0.999:
                if self.last_trade == "sell":
                    self.sell_all()
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

            elif sentiment == "negative" and probability > 0.999:
                if self.last_trade == "buy":
                    self.sell_all()
                order = self.create_order(
                    self.symbol,
                    quantity,
                    "sell",
                    type="bracket",
                    take_profit_price=last_price*0.8,
                    stop_loss_price=last_price*1.05
                )
                self.submit_order(order)
                self.last_trade = "sell"

def init_broker(alpaca_api_key, alpaca_api_secret):
    ALPACA_CREDS = {
      "API_KEY": alpaca_api_key,
      "API_SECRET": alpaca_api_secret,
      "PAPER": True
    }
    broker = Alpaca(ALPACA_CREDS)
    return broker

async def backtestStrategy(symbol, year, benchmark, cash_at_risk, user_id):
  try:
    alpaca_api_key, alpaca_api_secret = get_alpaca_keys(user_id)
    broker = init_broker(alpaca_api_key, alpaca_api_secret)
    strategy = MLTrader(name="mlstrategy",
                        broker=broker,
                        parameters={
                            "symbol": symbol.upper(),
                            "cash_at_risk": cash_at_risk,
                            "alpaca_api_key": alpaca_api_key,
                            "alpaca_api_secret": alpaca_api_secret
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
            "alpaca_api_key": alpaca_api_key,
            "alpaca_api_secret": alpaca_api_secret
        },
        show_tearsheet=False,
        show_plot=False
    )
    state = "Completed"
  except:
     state = "Error"
  return state