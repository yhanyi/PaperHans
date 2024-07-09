from flask import Flask, jsonify
from flask_cors import CORS
from transformers import pipeline
import requests
from dotenv import load_dotenv
import os
import datetime

load_dotenv()

app = Flask(__name__)
CORS(app)

NEWS_API_KEY = os.getenv('NEWS_API_KEY')

sentiment_pipeline = pipeline("sentiment-analysis", model="ProsusAI/finbert")

def fetch_crypto_news(query='cryptocurrency'):
    today = datetime.date.today()
    startdate = today - datetime.timedelta(days=60)
    url = f'https://newsapi.org/v2/everything?q={query}&from={startdate.strftime}&sortBy=publishedAt&apiKey={NEWS_API_KEY}&language=en'
    response = requests.get(url)
    data = response.json()
    return data['articles']

def process_news(news):
    processed_news = []
    for item in news:
        processed_news.append({
            "title": item.get("title", "No Title"),
            "info": item.get("description", "No Description"),
            "url": item.get("url", "No URL")
        })
    return processed_news

def analyze_sentiment(news):
    for item in news:
        try:
          sentiment = sentiment_pipeline(item['info'])
          item['sentiment'] = sentiment[0]['label'].capitalize()
        except:
          item['sentiment'] = 'Error'
    return news

@app.route('/api/news', methods=['GET'])
def get_news():
    news = fetch_crypto_news()
    processed_news = process_news(news)
    news_with_sentiment = analyze_sentiment(processed_news)
    return jsonify(news_with_sentiment)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
