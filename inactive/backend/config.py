import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

class Config:
    # Flask configuration
    SECRET_KEY = os.getenv('SECRET_KEY', 'dev')
    DEBUG = os.getenv('FLASK_DEBUG', 'True').lower() == 'true'
    
    # Database configuration
    DATABASE_PATH = os.getenv('DATABASE_PATH', 'scraped_data.db')
    
    # Scraping configuration
    SCRAPING_TIMEOUT = int(os.getenv('SCRAPING_TIMEOUT', '10'))
    DYNAMIC_LOAD_WAIT = int(os.getenv('DYNAMIC_LOAD_WAIT', '5'))
    
    # CORS configuration
    CORS_ORIGINS = os.getenv('CORS_ORIGINS', '*').split(',')
    
    # API configuration
    API_PREFIX = '/api'
    
    # User agent for scraping
    USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36' 