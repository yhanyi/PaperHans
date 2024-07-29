# web:npm install && npm run dev
web: npm start
worker: uvicorn api.main:app --host=0.0.0.0 --port=${PORT:-8000} --proxy-headers --forwarded-allow-ips="*"
