from flask import Flask, jsonify
from flask_cors import CORS
from yahoofinancials import YahooFinancials
import requests
from transformers import pipeline

app = Flask(__name__)
CORS(app)

sentiment_pipeline = pipeline("sentiment-analysis", model="ProsusAI/finbert")

@app.route('/api/news', methods=['GET'])
def get_news():

    # Hardcoded data temporarily
    news_data = [
        {"title": "Bitcoin hits new all-time high", "url": "https://example.com/bitcoin-high"},
        {"title": "Ethereum upgrade expected to boost performance", "url": "https://example.com/ethereum-upgrade"},
    ]
    
    for news in news_data:
        sentiment = sentiment_pipeline(news["title"])[0]
        news["sentiment"] = sentiment["label"].lower()

    return jsonify(news_data)

if __name__ == '__main__':
    app.run(debug=True)
