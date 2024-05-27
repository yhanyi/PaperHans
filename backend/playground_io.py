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
    
# @app.get("/tearsheet/{filename}")
# async def get_tearsheet(filename: str):
#     try:
#         file_path = os.path.join(LOGS_DIRECTORY, filename)
#         return FileResponse(file_path, media_type='text/html')
#     except Exception as e:
#         raise HTTPException(status_code=404, detail=str(e))

LOGS_DIRECTORY = os.path.join(os.path.dirname(__file__), 'logs')

# TODO: Remove hardcoding. Hardcoded to test functionality.
@app.get("/tearsheet")
async def get_tearsheet():
    try:
        file_path = os.path.join(LOGS_DIRECTORY, 'tearsheet.html')
        if not os.path.isfile(file_path):
            raise HTTPException(status_code=404, detail="Tearsheet not found")
        return FileResponse(file_path, media_type='text/html')
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
