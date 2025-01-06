from flask import Flask, request, jsonify
from bs4 import BeautifulSoup
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable cross-origin requests

@app.route('/scrape', methods=['POST'])
def scrape():
    url = request.json.get('url')  # URL sent from the extension
    response = requests.get(url)
    
    if response.status_code != 200:
        return jsonify({"error": "Failed to fetch page"}), 500

    soup = BeautifulSoup(response.text, 'html.parser')
    coupons = []

    # Example: Extract coupon codes from the page
    for coupon in soup.select('.coupon-code'):
        coupons.append(coupon.text.strip())

    return jsonify({"coupons": coupons})

if __name__ == '__main__':
    app.run(port=5000)