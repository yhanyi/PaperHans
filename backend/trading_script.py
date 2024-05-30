import asyncio
from lumibot.brokers import Alpaca
from lumibot.backtesting import YahooDataBacktesting
from lumibot.strategies.strategy import Strategy
from lumibot.traders import Trader
from lumibot.entities import Asset
import math
from datetime import datetime, timedelta

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