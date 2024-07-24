from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import trading_script as trade
import os

app = FastAPI()

# Allow CORS for all origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class BacktestParameters(BaseModel):
    symbol: str
    year: str
    benchmark: str
    cashAtRisk: str
    userId: str

# Caches backtesting status
backtest_status = {"status":"idle"}

@app.post("/process")
async def process_data(bp: BacktestParameters):
    try:
        backtest_status["status"] = "running"
        result = await trade.backtestStrategy(bp.symbol, int(bp.year), bp.benchmark, float(bp.cashAtRisk), bp.userId)
        backtest_status["status"] = "complete"
        cleanup_logs_files()
        return {"result": result}
    except Exception as e:
        backtest_status["status"] = "error"
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/status")
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
        
@app.get("/tearsheet")
async def get_tearsheet():
    try:
        file_path = os.path.join(LOGS_DIRECTORY, 'tearsheet.html')
        if not os.path.isfile(file_path):
            raise HTTPException(status_code=404, detail="Tearsheet not found")
        return FileResponse(file_path, media_type='text/html', filename='tearsheet.html')
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
