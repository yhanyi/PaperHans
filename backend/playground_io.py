from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import trading_script as trade

app = FastAPI()

# Allow CORS for all origins (adjust as necessary for production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Numbers(BaseModel):
    num1: int
    num2: int

@app.post("/process")
async def process_data(numbers: Numbers):
    try:
        result = await trade.test(numbers.num1, numbers.num2)
        return {"result": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
