# Start Uvicorn server
cd api
echo "Starting Uvicorn server."
uvicorn main:app --reload &

# Start Next.js frontend.
cd ..
echo "Starting Next.js frontend."
npm run dev

# Wait for all processes to finish.
wait