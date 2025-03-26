import streamlit as st
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

def validate_and_format_url(url):
    """Validate and format URL, adding https:// if no scheme is present"""
    if not url:
        return None
    
    # Remove any whitespace
    url = url.strip()
    
    # Add https:// if no scheme is present
    if not urlparse(url).scheme:
        url = "https://" + url
    
    try:
        # Validate URL
        result = urlparse(url)
        if not all([result.scheme, result.netloc]):
            return None
        return url
    except:
        return None

def clean_database():
    """Clean up database entries with invalid URLs"""
    conn = sqlite3.connect('scraped_data.db')
    c = conn.cursor()
    
    # Get all entries
    c.execute('SELECT id, url FROM scraped_data')
    rows = c.fetchall()
    
    # Clean URLs and update database
    for row_id, old_url in rows:
        formatted_url = validate_and_format_url(old_url)
        if formatted_url and formatted_url != old_url:
            c.execute('UPDATE scraped_data SET url = ? WHERE id = ?', 
                     (formatted_url, row_id))
    
    conn.commit()
    conn.close()

# Initialize SQLite database
def init_db():
    conn = sqlite3.connect('scraped_data.db')
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS scraped_data
        (id INTEGER PRIMARY KEY AUTOINCREMENT,
         url TEXT,
         content TEXT,
         timestamp DATETIME,
         title TEXT)
    ''')
    conn.commit()
    conn.close()

# Function to scrape static content
def scrape_static(url):
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, 'html.parser')
        return soup.get_text()
    except requests.exceptions.RequestException as e:
        st.error(f"Error scraping static content: {str(e)}")
        return None

# Function to scrape dynamic content
def scrape_dynamic(url):
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
        time.sleep(5)  # Increased wait time for dynamic content
        
        content = driver.page_source
        soup = BeautifulSoup(content, 'html.parser')
        driver.quit()
        return soup.get_text()
    except Exception as e:
        st.error(f"Error scraping dynamic content: {str(e)}")
        return None

# Function to save to database
def save_to_db(url, content, title):
    if not content:  # Don't save if scraping failed
        return False
    
    conn = sqlite3.connect('scraped_data.db')
    c = conn.cursor()
    c.execute('''
        INSERT INTO scraped_data (url, content, timestamp, title)
        VALUES (?, ?, ?, ?)
    ''', (url, content, datetime.now(), title))
    conn.commit()
    conn.close()
    return True

# Streamlit UI
st.title("Web Scraper App")
st.write("Enter a URL to scrape and store its content in SQLite database")

# Initialize database and clean old entries
init_db()
clean_database()

# URL input with validation
url = st.text_input("Enter URL to scrape:", placeholder="e.g., ds100.org or https://ds100.org")
formatted_url = validate_and_format_url(url)

if url and not formatted_url:
    st.error("Please enter a valid URL")

# Scraping method selection
scraping_method = st.radio(
    "Select scraping method:",
    ["Static (Simple)", "Dynamic (JavaScript)"]
)

if st.button("Scrape"):
    if formatted_url:
        with st.spinner("Scraping in progress..."):
            # Get page title
            try:
                headers = {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
                }
                response = requests.get(formatted_url, headers=headers, timeout=10)
                soup = BeautifulSoup(response.text, 'html.parser')
                title = soup.title.string if soup.title else "Untitled"
            except requests.exceptions.RequestException as e:
                st.error(f"Error getting page title: {str(e)}")
                title = "Untitled"

            # Scrape content based on selected method
            if scraping_method == "Static (Simple)":
                content = scrape_static(formatted_url)
            else:
                content = scrape_dynamic(formatted_url)

            # Save to database only if scraping was successful
            if content:
                if save_to_db(formatted_url, content, title):
                    st.success("Scraping completed and data saved to database!")
                    
                    # Display preview
                    st.subheader("Preview of scraped content:")
                    st.text(content[:500] + "...")
                else:
                    st.error("Failed to save data to database")
            else:
                st.error("Failed to scrape content")
    else:
        st.error("Please enter a valid URL")

# Display database contents
st.subheader("Previously Scraped Data")
conn = sqlite3.connect('scraped_data.db')
c = conn.cursor()
c.execute('SELECT * FROM scraped_data ORDER BY timestamp DESC LIMIT 5')
rows = c.fetchall()
conn.close()

if rows:
    for row in rows:
        with st.expander(f"{row[4]} - {row[2]}"):
            st.write(f"URL: {row[1]}")
            st.write(f"Timestamp: {row[3]}")
            st.text(row[2][:200] + "...")
else:
    st.write("No data scraped yet") 