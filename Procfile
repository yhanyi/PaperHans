# web:npm install && npm run dev
web: npm start
worker: gunicorn -k uvicorn.workers.UvicornWorker api.main:app --host=0.0.0.0 --port=8000
