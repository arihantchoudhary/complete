import os, time
from openai import OpenAI
from redis_cache import RedisCache
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Setup
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
cache = RedisCache(namespace="openai")

def generate_response(messages):
    # Create a unique cache key based on the message contents
    key = f"response:{hash(tuple(msg['content'] for msg in messages))}"
    
    # Try to get from cache first
    cached = cache.get(key)
    if cached:
        return cached
    
    # If not in cache, call the OpenAI API
    resp = client.chat.completions.create(
        model="gpt-3.5-turbo",
        stream=False,
        messages=messages,
        temperature=0.7,
        max_tokens=150,
    )
    text = resp.choices[0].message.content
    
    # Store in cache with 1-hour expiration
    cache.set(key, text, expire_seconds=3600)
    
    return text

# Usage
history = [
    {"role": "system", "content": "You are a helpful assistant."},
    {"role": "user",   "content": "Explain quantum entanglement in simple terms."},
]
start = time.time()
answer = generate_response(history)
print(f"Latency: {time.time() - start:.2f}s → {answer}")
