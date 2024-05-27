import asyncio
from lumibot.brokers import Alpaca
from lumibot.backtesting import YahooDataBacktesting
from lumibot.strategies.strategy import Strategy
from lumibot.traders import Trader
import math
import os # Maybe can remove after testing.
from datetime import datetime, timedelta

class MLTrader(Strategy):
    def initialize(self, symbol="SPY", cash_at_risk=0.5):
        self.symbol = symbol
        self.sleeptime = "24H"
        self.last_trade = None

    def on_trading_iteration(self):
        if self.last_trade == None:
            order = self.create_order(
                self.symbol,
                10,
                "buy",
                type="market",
            )
            self.submit_order(order)
            self.last_trade = "buy"

async def test(a, b):
  # await asyncio.sleep(10) # Simulate a 10s computation
  # ALPACA_CREDS = {
  #   "API_KEY": os.getenv("ALPACA_KEY"),
  #   "API_SECRET": os.getenv("ALPACA_SECRET"),
  #   "PAPER": True
  # }
  ALPACA_CREDS = {
    "API_KEY": "",
    "API_SECRET": "",
    "PAPER": True
  }
  print(ALPACA_CREDS)
  broker = Alpaca(ALPACA_CREDS)
  strategy = MLTrader(name="mlstrategy",
                      broker=broker,
                      parameters={
                          "symbol": "SPY",
                      })

  start_date = datetime(2023, 12, 1)
  end_date = datetime(2023, 12, 31)

  strategy.backtest(
      YahooDataBacktesting,
      start_date,
      end_date,
      parameters={
          "symbol": "SPY",
      }
  )
  return a + b