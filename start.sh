# Start Flask server
echo "Starting Flask server."
cd backend
python3 news_fetcher.py &

# Start Uvicorn server
echo "Starting Uvicorn server."
uvicorn playground_io:app --reload &

# Start Next.js frontend.
cd ..
echo "Starting Next.js frontend."
npm run dev

# Wait for all processes to finish.
wait