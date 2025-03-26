from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
import sqlite3
from datetime import datetime
import time
from urllib.parse import urlparse
import os

app = Flask(__name__)
# Configure CORS to allow all origins
CORS(app, resources={r"/api/*": {"origins": "*"}})

def validate_and_format_url(url):
    """Validate and format URL, adding https:// if no scheme is present"""
    if not url:
        return None
    
    url = url.strip()
    if not urlparse(url).scheme:
        url = "https://" + url
    
    try:
        result = urlparse(url)
        if not all([result.scheme, result.netloc]):
            return None
        return url
    except:
        return None

def init_db():
    """Initialize SQLite database"""
    conn = sqlite3.connect('scraped_data.db')
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS scraped_data
        (id INTEGER PRIMARY KEY AUTOINCREMENT,
         url TEXT,
         content TEXT,
         timestamp DATETIME)
    ''')
    conn.commit()
    conn.close()

def scrape_static(url):
    """Scrape static content from URL"""
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, 'html.parser')
        return soup.get_text()
    except requests.exceptions.RequestException as e:
        return None

def scrape_dynamic(url):
    """Scrape dynamic content from URL"""
    try:
        chrome_options = Options()
        chrome_options.add_argument("--headless")
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--disable-dev-shm-usage")
        chrome_options.add_argument("--disable-gpu")
        chrome_options.add_argument("--window-size=1920,1080")
        
        service = Service(ChromeDriverManager().install())
        driver = webdriver.Chrome(service=service, options=chrome_options)
        
        driver.get(url)
        time.sleep(5)
        
        content = driver.page_source
        soup = BeautifulSoup(content, 'html.parser')
        driver.quit()
        return soup.get_text()
    except Exception as e:
        return None

def save_to_db(url, content):
    """Save scraped content to database"""
    if not content:
        return False
    
    conn = sqlite3.connect('scraped_data.db')
    c = conn.cursor()
    c.execute('''
        INSERT INTO scraped_data (url, content, timestamp)
        VALUES (?, ?, ?)
    ''', (url, content, datetime.now()))
    conn.commit()
    conn.close()
    return True

@app.route('/api/scrape', methods=['POST'])
def scrape():
    data = request.get_json()
    url = data.get('url')
    scraping_method = data.get('method', 'static')
    
    if not url:
        return jsonify({'error': 'URL is required'}), 400
    
    formatted_url = validate_and_format_url(url)
    if not formatted_url:
        return jsonify({'error': 'Invalid URL'}), 400
    
    # Initialize database
    init_db()
    
    # Scrape content
    if scraping_method == 'static':
        content = scrape_static(formatted_url)
    else:
        content = scrape_dynamic(formatted_url)
    
    if not content:
        return jsonify({'error': 'Failed to scrape content'}), 500
    
    # Save to database
    if save_to_db(formatted_url, content):
        return jsonify({
            'success': True,
            'message': 'Content scraped and saved successfully',
            'content': content[:1000] + '...'  # Return first 1000 chars as preview
        })
    else:
        return jsonify({'error': 'Failed to save content'}), 500

@app.route('/api/generate-calendar', methods=['POST'])
def generate_calendar():
    data = request.get_json()
    content = data.get('content')
    
    if not content:
        return jsonify({'error': 'Content is required'}), 400
    
    try:
        # Here you would integrate with GPT to process the content
        # For now, we'll just return a success message
        return jsonify({
            'success': True,
            'message': 'Calendar generation initiated',
            'content': content[:1000] + '...'
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True) 