# web:npm install && npm run dev
web: npm start
worker: gunicorn -k uvicorn.workers.UvicornWorker api.main:app --bind 0.0.0.0:8000
