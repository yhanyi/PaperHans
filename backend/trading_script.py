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

async def backtestStrategy(symbol, year, benchmark):
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
                        })
  

    start_date = datetime(year, 12, 1)
    end_date = datetime(year, 12, 31)

    print(symbol)
    strategy.backtest(
        YahooDataBacktesting,
        start_date,
        end_date,
        benchmark_asset=benchmark.upper(),
        parameters={
            "symbol": symbol.upper(),
        },
        show_tearsheet=False,
        show_plot=False
    )
  except:
     state = "Error encountered while backtesting."
  return state