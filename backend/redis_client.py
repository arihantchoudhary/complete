import os
from redis import Redis

def get_redis_connection():
    """
    Create and return a Redis connection using environment variables.
    
    Returns:
        Redis: A configured Redis client instance.
    """
    redis_url = os.getenv("REDIS_URL")
    
    if not redis_url:
        raise ValueError("REDIS_URL environment variable is not set")
    
    return Redis.from_url(redis_url)

def test_connection():
    """
    Test the Redis connection.
    
    Returns:
        bool: True if connection is successful, False otherwise.
    """
    try:
        redis = get_redis_connection()
        return redis.ping()
    except Exception as e:
        print(f"Redis connection error: {e}")
        return False

if __name__ == "__main__":
    # This will only run if the file is executed directly
    if test_connection():
        print("Redis connection successful!")
    else:
        print("Redis connection failed!")
