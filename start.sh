# start.sh
#!/bin/bash
echo "Starting Backend..."
pip3 install -r requirements.txt
python3.11 -m uvicorn api.main:app --host 0.0.0.0 --port $PORT &

echo "Starting Frontend..."
npm run build
npm run start