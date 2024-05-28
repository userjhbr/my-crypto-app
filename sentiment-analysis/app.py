import praw
import os
from textblob import TextBlob
from flask import Flask, request, jsonify
from pymongo import MongoClient

app = Flask(__name__)

# Configuração do MongoDB
client = MongoClient('mongodb://mongodb:27017/')
db = client['sentiment_db']
posts_collection = db['posts']

# Configuração do Reddit API
reddit = praw.Reddit(
    client_id=os.getenv('REDDIT_CLIENT_ID'),
    client_secret=os.getenv('REDDIT_CLIENT_SECRET'),
    user_agent=os.getenv('REDDIT_USER_AGENT')
)

def analyze_sentiment(text):
    analysis = TextBlob(text)
    if analysis.sentiment.polarity > 0:
        return 'positive'
    elif analysis.sentiment.polarity == 0:
        return 'neutral'
    else:
        return 'negative'

@app.route('/posts', methods=['GET'])
def get_posts():
    subreddit_name = request.args.get('subreddit')
    posts = reddit.subreddit(subreddit_name).hot(limit=100)
    
    post_data = []
    for post in posts:
        sentiment = analyze_sentiment(post.title)
        post_data.append({
            'title': post.title,
            'sentiment': sentiment
        })
        posts_collection.insert_one({
            'title': post.title,
            'sentiment': sentiment
        })
    
    return jsonify(post_data)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
