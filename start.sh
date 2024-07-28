# start.sh
#!/bin/bash
echo "Starting Backend..."
pip3 install -r requirements.txt
python3.11 -m uvicorn api.main:app --host 0.0.0.0 --port 8000 &

echo "Starting Frontend..."
npm install
npm run build
npm run start
