import os
from redis_client import get_redis_connection

def test_redis_operations():
    """
    Test basic Redis operations to verify the connection and functionality.
    """
    print("Testing Redis connection and operations...")
    
    try:
        # Get Redis connection
        redis = get_redis_connection()
        
        # Test connection with ping
        if redis.ping():
            print("✅ Connection successful!")
        else:
            print("❌ Connection failed on ping.")
            return False
        
        # Test set operation
        key = "test:key"
        value = "Hello from the test script!"
        redis.set(key, value)
        print(f"✅ Successfully set key '{key}'")
        
        # Test get operation
        retrieved = redis.get(key)
        if retrieved:
            print(f"✅ Successfully retrieved value: '{retrieved.decode()}'")
        else:
            print(f"❌ Failed to retrieve key '{key}'")
            return False
            
        # Test delete operation
        redis.delete(key)
        print(f"✅ Successfully deleted key '{key}'")
        
        # Verify key is gone
        if redis.get(key) is None:
            print("✅ Key deletion verified")
        else:
            print("❌ Key still exists after deletion")
            return False
            
        print("All Redis operations completed successfully!")
        return True
        
    except Exception as e:
        print(f"❌ Error during Redis operations: {e}")
        return False

if __name__ == "__main__":
    test_redis_operations()
