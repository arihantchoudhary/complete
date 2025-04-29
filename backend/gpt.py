import os, time
from openai import OpenAI
from redis import Redis

# Setup
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
cache = Redis.from_url(os.getenv("REDIS_URL"))

def generate_response(messages):
    key = f"cache:{hash(tuple(msg['content'] for msg in messages))}"
    cached = cache.get(key)
    if cached:
        return cached.decode()

    resp = client.chat.completions.create(
        model="gpt-3.5-turbo",
        stream=False,
        messages=messages,
        temperature=0.7,
        max_tokens=150,
    )
    text = resp.choices[0].message.content
    cache.set(key, text, ex=3600)  # cache for 1h
    return text

# Usage
history = [
    {"role": "system", "content": "You are a helpful assistant."},
    {"role": "user",   "content": "Explain quantum entanglement in simple terms."},
]
start = time.time()
answer = generate_response(history)
print(f"Latency: {time.time() - start:.2f}s → {answer}")
