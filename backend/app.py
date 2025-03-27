from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import requests
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
import sqlite3
from datetime import datetime, timedelta
import time
from urllib.parse import urlparse
import pandas as pd
import re
from icalendar import Calendar, Event
from dateutil import parser
import io
from config import Config

# Initialize Flask app
app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": Config.CORS_ORIGINS}})

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
    conn = sqlite3.connect(Config.DATABASE_PATH)
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
            'User-Agent': Config.USER_AGENT
        }
        response = requests.get(url, headers=headers, timeout=Config.SCRAPING_TIMEOUT)
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
        time.sleep(Config.DYNAMIC_LOAD_WAIT)
        
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
    
    conn = sqlite3.connect(Config.DATABASE_PATH)
    c = conn.cursor()
    c.execute('''
        INSERT INTO scraped_data (url, content, timestamp)
        VALUES (?, ?, ?)
    ''', (url, content, datetime.now()))
    conn.commit()
    conn.close()
    return True

def extract_events(content):
    """Extract events and dates from content"""
    # Common patterns for dates and events
    date_patterns = [
        r'(\w+)\s+(\d+)\s+(\w+)\s+(\d{4})\s*[-–]\s*(.*?)(?=\n|$)',  # Date - Event
        r'(\w+)\s+(\d+)\s+(\w+)\s+(\d{4})\s*:\s*(.*?)(?=\n|$)',     # Date: Event
        r'(\w+)\s+(\d+)\s+(\w+)\s+(\d{4})\s+(.*?)(?=\n|$)',         # Date Event
        r'(\w+)\s+(\d+)\s+(\w+)\s+(\d{4})\s*Due\s*:\s*(.*?)(?=\n|$)' # Date Due: Event
    ]
    
    events = []
    for pattern in date_patterns:
        matches = re.finditer(pattern, content, re.IGNORECASE)
        for match in matches:
            day, date, month, year, event_desc = match.groups()
            try:
                # Convert date string to datetime
                date_str = f"{month} {date}, {year}"
                date_obj = parser.parse(date_str)
                
                # Create event object
                event = {
                    'summary': event_desc.strip(),
                    'dtstart': date_obj,
                    'dtend': date_obj + timedelta(hours=1),  # Default 1-hour duration
                    'description': f"Extracted from: {url}"
                }
                events.append(event)
            except ValueError:
                continue
    
    return events

def generate_ics(events, url):
    """Generate ICS file from events"""
    cal = Calendar()
    cal.add('prodid', '-//Complete Calendar Generator//example.com//')
    cal.add('version', '2.0')
    cal.add('name', f'Events from {url}')
    cal.add('description', f'Generated events from {url}')
    
    for event_data in events:
        event = Event()
        event.add('summary', event_data['summary'])
        event.add('dtstart', event_data['dtstart'])
        event.add('dtend', event_data['dtend'])
        event.add('description', event_data['description'])
        cal.add_component(event)
    
    return cal.to_ical()

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
    url = data.get('url')
    
    if not content or not url:
        return jsonify({'error': 'Content and URL are required'}), 400
    
    try:
        # Extract events from content
        events = extract_events(content)
        
        if not events:
            return jsonify({'error': 'No events found in content'}), 400
        
        # Generate ICS file
        ics_content = generate_ics(events, url)
        
        # Create response with ICS file
        return send_file(
            io.BytesIO(ics_content),
            mimetype='text/calendar',
            as_attachment=True,
            download_name='course_calendar.ics'
        )
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat()
    })

if __name__ == '__main__':
    app.run(debug=True) 