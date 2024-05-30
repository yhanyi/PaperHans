from lumibot.brokers import Alpaca
from lumibot.backtesting import YahooDataBacktesting
from lumibot.strategies.strategy import Strategy
from lumibot.traders import Trader
from lumibot.entities import Asset
import math
from datetime import datetime, timedelta
from modelzoo import finbert_estimate_sentiment

# Version 1 MLTrader
class MLTrader(Strategy):
    def initialize(self, symbol, cash_at_risk=0.5):
        self.symbol = symbol
        self.sleeptime = "24H"
        self.last_trade = None
        self.cash_at_risk = cash_at_risk

    def position_sizing(self):
        cash = self.get_cash()
        last_price = self.get_last_price(self.symbol)
        quantity = math.floor(cash * self.cash_at_risk / last_price)
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

async def backtestStrategy(symbol, year, benchmark, cash_at_risk):
  # ALPACA_CREDS = {
  #   "API_KEY": os.getenv("ALPACA_KEY"),
  #   "API_SECRET": os.getenv("ALPACA_SECRET"),
  #   "PAPER": True
  # }
  state = "Backtest Complete"
  try:
    ALPACA_CREDS = {
      "API_KEY": "",
      "API_SECRET": "",
      "PAPER": True
    }
    broker = Alpaca(ALPACA_CREDS)
    strategy = MLTrader(name="mlstrategy",
                        broker=broker,
                        parameters={
                            "symbol": symbol.upper(),
                            "cash_at_risk": cash_at_risk
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
            "cash_at_risk": cash_at_risk
        },
        show_tearsheet=False,
        show_plot=False
    )
  except:
     state = "Error encountered while backtesting."
  return state