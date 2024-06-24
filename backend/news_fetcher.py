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
        {
            "title": "Bitcoin hits new all-time high",
            "info": "Bitcoin has hit a new all-time high of $60,000",
            "url": "https://www.google.com"
        },
        {
            "title": "Ethereum upgrade expected to boost performance",
            "info": "Ethereum is expected to upgrade to Ethereum 2.0",
            "url": "https://www.google.com"
        },
        {
            "title": "DogeCoin completely tanks.",
            "info": "DogeCoin has seen a massive drop in value.",
            "url": "https://www.google.com"
        },
        {
            "title": "Elon Musk laughs at crypto bros, meme coins see fat drop.",
            "info": "Elon Musk has made fun of meme coins on Twitter.",
            "url": "https://www.google.com"
        },
        {
            "title": "GamestopCoin sees uncertain future.",
            "info": "GamestopCoin has seen a drop in value.",
            "url": "https://www.google.com"
        }, 
    ]
    
    for news in news_data:
        sentiment = sentiment_pipeline(news["title"])[0]
        news["sentiment"] = sentiment["label"].lower()

    return jsonify(news_data)

if __name__ == '__main__':
    app.run(debug=True)
