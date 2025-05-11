import json
import time
from typing import Any, Dict, List, Optional, Union
from redis_client import get_redis_connection

class RedisCache:
    """
    A wrapper around Redis client providing convenient caching functionality.
    """
    
    def __init__(self, namespace: str = "app"):
        """
        Initialize the cache with a connection and namespace.
        
        Args:
            namespace: A prefix for all keys stored by this cache instance
        """
        self.redis = get_redis_connection()
        self.namespace = namespace
        
    def _make_key(self, key: str) -> str:
        """
        Create a namespaced key to avoid collisions.
        
        Args:
            key: The original key
            
        Returns:
            The namespaced key
        """
        return f"{self.namespace}:{key}"
        
    def set(self, key: str, value: Any, expire_seconds: Optional[int] = None) -> bool:
        """
        Set a value in the cache.
        
        Args:
            key: The key to store the value under
            value: The value to store (will be JSON serialized if not a string)
            expire_seconds: Optional TTL in seconds
            
        Returns:
            True if successful, False otherwise
        """
        try:
            # Convert non-string values to JSON
            if not isinstance(value, (str, bytes)):
                value = json.dumps(value)
                
            namespaced_key = self._make_key(key)
            if expire_seconds is not None:
                return self.redis.setex(namespaced_key, expire_seconds, value)
            else:
                return self.redis.set(namespaced_key, value)
        except Exception as e:
            print(f"Error setting cache key {key}: {e}")
            return False
            
    def get(self, key: str, default: Any = None, json_decode: bool = True) -> Any:
        """
        Get a value from the cache.
        
        Args:
            key: The key to retrieve
            default: The default value to return if key doesn't exist
            json_decode: Whether to attempt JSON decoding of the value
            
        Returns:
            The retrieved value or default if key doesn't exist
        """
        try:
            namespaced_key = self._make_key(key)
            value = self.redis.get(namespaced_key)
            
            if value is None:
                return default
                
            # Decode bytes to string
            if isinstance(value, bytes):
                value = value.decode('utf-8')
                
            # Try to decode JSON
            if json_decode and isinstance(value, str):
                try:
                    return json.loads(value)
                except json.JSONDecodeError:
                    pass
                    
            return value
        except Exception as e:
            print(f"Error getting cache key {key}: {e}")
            return default
            
    def delete(self, key: str) -> bool:
        """
        Delete a key from the cache.
        
        Args:
            key: The key to delete
            
        Returns:
            True if successful, False otherwise
        """
        try:
            namespaced_key = self._make_key(key)
            return bool(self.redis.delete(namespaced_key))
        except Exception as e:
            print(f"Error deleting cache key {key}: {e}")
            return False
            
    def exists(self, key: str) -> bool:
        """
        Check if a key exists in the cache.
        
        Args:
            key: The key to check
            
        Returns:
            True if the key exists, False otherwise
        """
        try:
            namespaced_key = self._make_key(key)
            return bool(self.redis.exists(namespaced_key))
        except Exception as e:
            print(f"Error checking existence of cache key {key}: {e}")
            return False
            
    def expire(self, key: str, seconds: int) -> bool:
        """
        Set the expiration time of a key.
        
        Args:
            key: The key to set expiration for
            seconds: The TTL in seconds
            
        Returns:
            True if successful, False otherwise
        """
        try:
            namespaced_key = self._make_key(key)
            return self.redis.expire(namespaced_key, seconds)
        except Exception as e:
            print(f"Error setting expiration for cache key {key}: {e}")
            return False
            
    def cached(self, key_prefix: str, expire_seconds: int = 3600):
        """
        Decorator for caching function results.
        
        Args:
            key_prefix: Prefix for the cache key
            expire_seconds: TTL in seconds
            
        Returns:
            Decorator function
        """
        def decorator(func):
            def wrapper(*args, **kwargs):
                # Create a unique key based on function arguments
                key_parts = [key_prefix, func.__name__]
                if args:
                    key_parts.append(str(args))
                if kwargs:
                    key_parts.append(str(sorted(kwargs.items())))
                    
                cache_key = ":".join(key_parts)
                
                # Try to get from cache first
                cached_value = self.get(cache_key)
                if cached_value is not None:
                    return cached_value
                    
                # If not in cache, call the function
                result = func(*args, **kwargs)
                
                # Cache the result
                self.set(cache_key, result, expire_seconds=expire_seconds)
                
                return result
            return wrapper
        return decorator


# Example usage:
if __name__ == "__main__":
    # Create a cache for user data
    user_cache = RedisCache(namespace="users")
    
    # Store a user object
    user = {
        "id": 123,
        "name": "John Doe",
        "email": "john@example.com",
        "roles": ["admin", "editor"]
    }
    
    user_cache.set(f"user:{user['id']}", user, expire_seconds=3600)
    
    # Retrieve the user
    cached_user = user_cache.get(f"user:{user['id']}")
    print(f"Retrieved user: {cached_user}")
    
    # Example of the cached decorator
    @user_cache.cached(key_prefix="user_search", expire_seconds=600)
    def find_users_by_role(role):
        print(f"Executing expensive database query for role: {role}")
        # This would normally hit a database
        time.sleep(1)  # Simulate DB query
        return [
            {"id": 123, "name": "John", "role": role},
            {"id": 456, "name": "Jane", "role": role}
        ]
    
    # First call will execute the function
    print("First call:")
    users = find_users_by_role("admin")
    print(f"Found {len(users)} users")
    
    # Second call will retrieve from cache
    print("\nSecond call (should be cached):")
    users = find_users_by_role("admin")
    print(f"Found {len(users)} users")
