import os
import json
import requests
from typing import Dict, List, Any, Optional
from dotenv import load_dotenv

class Grok3Client:
    """
    Client for interacting with the X.AI Grok-3 API to search for tariff information.
    """
    
    def __init__(self, api_key_path: str = ".env"):
        """
        Initialize the Grok-3 API client.
        
        Args:
            api_key_path: Path to .env file containing GROK3_API_KEY
        """
        # Load API key from .env file
        load_dotenv(dotenv_path=api_key_path)
        self.api_key = os.getenv("GROK3_API_KEY")
        if not self.api_key:
            raise ValueError("GROK3_API_KEY not found in environment variables")
        
        self.api_url = "https://api.x.ai/v1/chat/completions"
        self.headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {self.api_key}"
        }
    
    def search_tariffs(self, 
                      origin_country: str, 
                      destination_country: str, 
                      item_type: str,
                      hs_code: Optional[str] = None) -> Dict[str, Any]:
        """
        Search for the latest tariff information for a specific trade route and item type.
        
        Args:
            origin_country: The country of origin for the goods
            destination_country: The destination country for the goods
            item_type: The type of item being shipped (e.g., Electronics, Textiles)
            hs_code: Optional Harmonized System code for more specific tariff information
            
        Returns:
            Dictionary containing tariff information
        """
        # Construct a detailed prompt for Grok-3
        hs_code_text = f" with HS code {hs_code}" if hs_code else ""
        prompt = f"""Please provide the latest tariff information for shipping {item_type}{hs_code_text} 
        from {origin_country} to {destination_country}. Include:
        1. Current tariff rate (percentage)
        2. Any additional taxes or duties
        3. Special trade agreements that may affect rates
        4. Recent changes to tariff policies
        5. Predicted future changes if available
        
        Format the response as a JSON object with the following structure:
        {{
            "tariff_rate": (percentage as a number),
            "additional_fees": [list of objects with "name" and "rate" fields],
            "trade_agreements": [list of relevant trade agreement names],
            "recent_changes": "description of recent changes",
            "future_changes": "description of predicted changes",
            "last_updated": "date when this data was last updated"
        }}
        
        Only return the JSON object, nothing else."""
        
        # Prepare the request payload
        payload = {
            "messages": [
                {
                    "role": "system",
                    "content": "You are a specialized assistant that provides accurate and up-to-date information on international trade tariffs and regulations. Return responses in the specified JSON format."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            "model": "grok-3-latest",
            "stream": False,
            "temperature": 0
        }
        
        try:
            # Make the API request
            response = requests.post(
                self.api_url,
                headers=self.headers,
                data=json.dumps(payload)
            )
            
            # Check for successful response
            response.raise_for_status()
            
            # Parse the response
            result = response.json()
            
            # Extract the content from the assistant's message
            if "choices" in result and len(result["choices"]) > 0:
                content = result["choices"][0]["message"]["content"]
                
                # Parse the JSON content
                try:
                    tariff_data = json.loads(content)
                    return tariff_data
                except json.JSONDecodeError:
                    # If the response isn't valid JSON, extract what we can
                    return self._extract_tariff_info_from_text(content)
            
            return {"error": "No valid response from Grok-3 API"}
            
        except requests.exceptions.RequestException as e:
            return {"error": f"API request failed: {str(e)}"}
        except Exception as e:
            return {"error": f"Error processing tariff search: {str(e)}"}
    
    def _extract_tariff_info_from_text(self, text: str) -> Dict[str, Any]:
        """
        Attempt to extract tariff information from text that isn't valid JSON.
        This is a fallback method in case the model doesn't return proper JSON.
        
        Args:
            text: The text response from the model
            
        Returns:
            Dictionary with extracted tariff information
        """
        # Default values
        tariff_data = {
            "tariff_rate": None,
            "additional_fees": [],
            "trade_agreements": [],
            "recent_changes": "",
            "future_changes": "",
            "last_updated": ""
        }
        
        # Basic extraction logic - can be enhanced for better parsing
        if "%" in text:
            # Try to find tariff rate
            import re
            rate_matches = re.findall(r'(\d+\.?\d*)%', text)
            if rate_matches:
                tariff_data["tariff_rate"] = float(rate_matches[0])
        
        # Include the original response for debugging
        tariff_data["original_response"] = text
        
        return tariff_data

    def get_hs_code(self, item_description: str) -> str:
        """
        Get the Harmonized System (HS) code for a specific item description.
        
        Args:
            item_description: Detailed description of the item
            
        Returns:
            Most likely HS code for the item
        """
        prompt = f"""Please provide the most appropriate Harmonized System (HS) code for:
        {item_description}
        
        Return only the HS code without any additional text."""
        
        payload = {
            "messages": [
                {
                    "role": "system",
                    "content": "You are a specialized assistant that provides accurate Harmonized System (HS) codes for international trade classification."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            "model": "grok-3-latest",
            "stream": False,
            "temperature": 0
        }
        
        try:
            response = requests.post(
                self.api_url,
                headers=self.headers,
                data=json.dumps(payload)
            )
            
            response.raise_for_status()
            result = response.json()
            
            if "choices" in result and len(result["choices"]) > 0:
                hs_code = result["choices"][0]["message"]["content"].strip()
                return hs_code
            
            return ""
            
        except Exception as e:
            print(f"Error getting HS code: {str(e)}")
            return ""

# Usage example:
if __name__ == "__main__":
    # Initialize the client
    client = Grok3Client()
    
    # Search for tariffs on electronics from China to USA
    result = client.search_tariffs(
        origin_country="China",
        destination_country="United States",
        item_type="Smartphones",
        hs_code="8517.12"
    )
    
    print(json.dumps(result, indent=2))
