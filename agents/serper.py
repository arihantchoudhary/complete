import requests
from typing import Dict, Any

class SerperAgent:
    def __init__(self, api_key: str):
        """
        Initialize the Serper API client.
        
        Args:
            api_key: Your Serper API key
        """
        self.api_key = api_key
        self.base_url = "https://google.serper.dev"
        self.headers = {
            "X-API-KEY": self.api_key,
            "Content-Type": "application/json"
        }
    
    def search(self, query: str) -> Dict[str, Any]:
        """
        Perform a search using the Serper API.
        
        Args:
            query: The search query string
            
        Returns:
            Dict containing the search results
            
        Raises:
            requests.exceptions.RequestException: If the API request fails
        """
        payload = {"q": query}
        response = requests.post(
            f"{self.base_url}/search",
            headers=self.headers,
            json=payload
        )
        response.raise_for_status()  # Raise an exception for HTTP errors
        return response.json()

# Example usage:
if __name__ == "__main__":
    # Replace with your actual API key
    api_key = "46c200260448143101e5c5ba0680bddac9eddcf0"
    agent = SerperAgent(api_key=api_key)
    results = agent.search("Glendo Elementary En 3rd, 82213 Glendo")
    print(results)

 