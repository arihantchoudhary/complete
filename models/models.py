import os
import json
import requests
from datetime import datetime, timedelta
from typing import List, Dict, Any, Optional, Union
from dotenv import load_dotenv
from openai import OpenAI

class LLMFactory:
    """
    Factory class that creates model-specific instances.
    Handles API key management and benchmark data.
    """
    
    def __init__(self, site_url: str = "", site_name: str = "", api_key_path: str = ".env"):
        """
        Initialize the LLM factory with OpenRouter configuration.
        
        Args:
            site_url: Your site URL for OpenRouter attribution
            site_name: Your site name for OpenRouter attribution
            api_key_path: Path to .env file containing OPENROUTER_API_KEY
        """
        # Load API key from .env file
        load_dotenv(dotenv_path=api_key_path)
        self.api_key = os.getenv("OPENROUTER_API_KEY")
        if not self.api_key:
            raise ValueError("OPENROUTER_API_KEY not found in environment variables")
        
        # Set up OpenAI client with OpenRouter base URL
        self.client = OpenAI(
            base_url="https://openrouter.ai/api/v1",
            api_key=self.api_key
        )
        
        # Store site information for headers
        self.site_url = site_url
        self.site_name = site_name
        
        # Initialize benchmark data storage
        self.benchmark_data = {}
        self.last_benchmark_update = None
        
        # Initialize model availability and default mappings
        self.model_mappings = {
            "gpt": "openai/gpt-3.5-turbo",
            "claude": "anthropic/claude-3-sonnet",
            "gemini": "google/gemini-pro",
            "sonar": "sonar/sonar-small-online",
            "llama": "meta-llama/llama-3-70b-instruct",
            "deepseek": "deepseek/deepseek-coder",
            "qwen": "qwen/qwen1.5-72b-chat"
        }
    
    def _get_headers(self) -> Dict[str, str]:
        """Get HTTP headers for OpenRouter API requests"""
        headers = {}
        if self.site_url:
            headers["HTTP-Referer"] = self.site_url
        if self.site_name:
            headers["X-Title"] = self.site_name
        return headers
    
    def createGPT(self, model_name: str = None, **params) -> 'ModelInstance':
        """
        Create a GPT model instance.
        
        Args:
            model_name: Specific GPT model variant, defaults to gpt-3.5-turbo
            **params: Additional model parameters
            
        Returns:
            ModelInstance configured for GPT
        """
        if model_name is None:
            model_name = self.model_mappings["gpt"]
        elif not model_name.startswith("openai/"):
            model_name = f"openai/{model_name}"
            
        return ModelInstance(
            client=self.client,
            model_name=model_name,
            benchmark_data=self.benchmark_data,
            headers=self._get_headers(),
            **params
        )
    
    def createClaude(self, model_name: str = None, **params) -> 'ModelInstance':
        """
        Create a Claude model instance.
        
        Args:
            model_name: Specific Claude model variant, defaults to claude-3-sonnet
            **params: Additional model parameters
            
        Returns:
            ModelInstance configured for Claude
        """
        if model_name is None:
            model_name = self.model_mappings["claude"]
        elif not model_name.startswith("anthropic/"):
            model_name = f"anthropic/{model_name}"
            
        return ModelInstance(
            client=self.client,
            model_name=model_name,
            benchmark_data=self.benchmark_data,
            headers=self._get_headers(),
            **params
        )
    
    def createGemini(self, model_name: str = None, **params) -> 'ModelInstance':
        """
        Create a Gemini model instance.
        
        Args:
            model_name: Specific Gemini model variant, defaults to gemini-pro
            **params: Additional model parameters
            
        Returns:
            ModelInstance configured for Gemini
        """
        if model_name is None:
            model_name = self.model_mappings["gemini"]
        elif not model_name.startswith("google/"):
            model_name = f"google/{model_name}"
            
        return ModelInstance(
            client=self.client,
            model_name=model_name,
            benchmark_data=self.benchmark_data,
            headers=self._get_headers(),
            **params
        )
    
    def createSonar(self, model_name: str = None, **params) -> 'ModelInstance':
        """
        Create a Sonar model instance.
        
        Args:
            model_name: Specific Sonar model variant, defaults to sonar-small-online
            **params: Additional model parameters
            
        Returns:
            ModelInstance configured for Sonar
        """
        if model_name is None:
            model_name = self.model_mappings["sonar"]
        elif not model_name.startswith("sonar/"):
            model_name = f"sonar/{model_name}"
            
        return ModelInstance(
            client=self.client,
            model_name=model_name,
            benchmark_data=self.benchmark_data,
            headers=self._get_headers(),
            **params
        )
    
    def createLlama(self, model_name: str = None, **params) -> 'ModelInstance':
        """
        Create a Llama model instance.
        
        Args:
            model_name: Specific Llama model variant, defaults to llama-3-70b-instruct
            **params: Additional model parameters
            
        Returns:
            ModelInstance configured for Llama
        """
        if model_name is None:
            model_name = self.model_mappings["llama"]
        elif not model_name.startswith("meta-llama/"):
            model_name = f"meta-llama/{model_name}"
            
        return ModelInstance(
            client=self.client,
            model_name=model_name,
            benchmark_data=self.benchmark_data,
            headers=self._get_headers(),
            **params
        )
    
    def createDeepSeek(self, model_name: str = None, **params) -> 'ModelInstance':
        """
        Create a DeepSeek model instance.
        
        Args:
            model_name: Specific DeepSeek model variant, defaults to deepseek-coder
            **params: Additional model parameters
            
        Returns:
            ModelInstance configured for DeepSeek
        """
        if model_name is None:
            model_name = self.model_mappings["deepseek"]
        elif not model_name.startswith("deepseek/"):
            model_name = f"deepseek/{model_name}"
            
        return ModelInstance(
            client=self.client,
            model_name=model_name,
            benchmark_data=self.benchmark_data,
            headers=self._get_headers(),
            **params
        )
    
    def createQwen(self, model_name: str = None, **params) -> 'ModelInstance':
        """
        Create a Qwen model instance.
        
        Args:
            model_name: Specific Qwen model variant, defaults to qwen1.5-72b-chat
            **params: Additional model parameters
            
        Returns:
            ModelInstance configured for Qwen
        """
        if model_name is None:
            model_name = self.model_mappings["qwen"]
        elif not model_name.startswith("qwen/"):
            model_name = f"qwen/{model_name}"
            
        return ModelInstance(
            client=self.client,
            model_name=model_name,
            benchmark_data=self.benchmark_data,
            headers=self._get_headers(),
            **params
        )
    
    def update_benchmark_data(self, force: bool = False) -> Dict[str, Any]:
        """
        Update benchmark data from the benchmarking API.
        Will only update once per day unless force=True.
        
        Args:
            force: Force update regardless of last update time
            
        Returns:
            Latest benchmark data
        """
        # Check if we need to update
        now = datetime.now()
        if (not force and self.last_benchmark_update and 
            now - self.last_benchmark_update < timedelta(days=1)):
            return self.benchmark_data
        
        try:
            # This is a placeholder for your actual benchmark API call
            # Replace with actual endpoint when available
            api_url = "https://your-benchmark-api.com/latest"
            response = requests.get(api_url)
            if response.status_code == 200:
                self.benchmark_data = response.json()
                self.last_benchmark_update = now
            else:
                print(f"Failed to update benchmark data: HTTP {response.status_code}")
        except Exception as e:
            print(f"Error updating benchmark data: {str(e)}")
        
        return self.benchmark_data
    
    def get_model_performance(self, model_name: str) -> Dict[str, Any]:
        """
        Get performance metrics for a specific model.
        
        Args:
            model_name: Name of the model to get metrics for
            
        Returns:
            Performance metrics for the specified model
        """
        # Update benchmark data if needed
        if not self.benchmark_data:
            self.update_benchmark_data()
            
        # Try to find the model in benchmark data
        # Handle both full paths and short names
        for name, data in self.benchmark_data.items():
            if model_name in name:
                return data
                
        # Return empty dict if model not found
        return {}


class ModelInstance:
    """
    A stateful model instance that maintains conversation history.
    Provides methods for generating completions and managing context.
    """
    
    def __init__(
        self, 
        client: OpenAI, 
        model_name: str, 
        benchmark_data: Dict[str, Any],
        headers: Dict[str, str] = None,
        system_prompt: str = "You are a helpful assistant.",
        max_tokens: int = 1024,
        temperature: float = 0.7,
        **params
    ):
        """
        Initialize a model instance.
        
        Args:
            client: OpenAI client configured for OpenRouter
            model_name: Full model name to use
            benchmark_data: Reference to benchmark data
            headers: HTTP headers for API requests
            system_prompt: Default system prompt
            max_tokens: Maximum number of tokens to generate
            temperature: Sampling temperature
            **params: Additional model parameters
        """
        self.client = client
        self.model_name = model_name
        self.benchmark_data = benchmark_data
        self.headers = headers or {}
        
        # Initialize conversation parameters
        self.system_prompt = system_prompt
        self.max_tokens = max_tokens
        
        # Initialize default parameters
        self.default_params = {
            "temperature": temperature,
            **params
        }
        
        # Initialize conversation history
        self.history = []
        if system_prompt:
            self.history.append({"role": "system", "content": system_prompt})
    
    def ask(
        self, 
        prompt: str, 
        images: List[str] = None,
        stream: bool = False,
        **params
    ) -> str:
        """
        Send a prompt to the model and get a completion.
        
        Args:
            prompt: Text prompt to send
            images: List of image URLs to include
            stream: Whether to stream the response
            **params: Additional parameters to override defaults
            
        Returns:
            Model completion text
        """
        # Prepare the message content
        message_content = []
        
        # Add text content
        message_content.append({
            "type": "text",
            "text": prompt
        })
        
        # Add image content if provided
        if images:
            for image_url in images:
                message_content.append({
                    "type": "image_url",
                    "image_url": {"url": image_url}
                })
        
        # Add the message to history
        self.history.append({
            "role": "user", 
            "content": message_content if images else prompt
        })
        
        # Prepare parameters by combining defaults with overrides
        request_params = {**self.default_params, **params}
        
        # Make the API request
        try:
            completion = self.client.chat.completions.create(
                extra_headers=self.headers,
                model=self.model_name,
                messages=[msg for msg in self.history if msg["role"] != "system"] if self.system_prompt else self.history,
                max_tokens=self.max_tokens,
                stream=stream,
                **request_params
            )
            
            # Handle streaming response
            if stream:
                response_text = ""
                for chunk in completion:
                    if chunk.choices and chunk.choices[0].delta.content:
                        response_text += chunk.choices[0].delta.content
                response = response_text
            else:
                response = completion.choices[0].message.content
            
            # Add response to history
            self.history.append({"role": "assistant", "content": response})
            
            return response
            
        except Exception as e:
            error_msg = f"Error generating completion: {str(e)}"
            print(error_msg)
            return error_msg
    
    def stream(self, prompt: str, images: List[str] = None, **params) -> str:
        """
        Stream a response from the model.
        
        Args:
            prompt: Text prompt to send
            images: List of image URLs to include
            **params: Additional parameters to override defaults
            
        Returns:
            Complete model response after streaming
        """
        return self.ask(prompt, images, stream=True, **params)
    
    def set_system_prompt(self, system_prompt: str) -> None:
        """
        Set or update the system prompt.
        
        Args:
            system_prompt: New system prompt
        """
        # Remove existing system message if present
        self.history = [msg for msg in self.history if msg["role"] != "system"]
        
        # Add new system message
        if system_prompt:
            self.system_prompt = system_prompt
            self.history.insert(0, {"role": "system", "content": system_prompt})
    
    def set_context_length(self, max_tokens: int) -> None:
        """
        Set the maximum number of tokens to generate.
        
        Args:
            max_tokens: Maximum number of tokens
        """
        self.max_tokens = max_tokens
    
    def clear_history(self, keep_system: bool = True) -> None:
        """
        Clear conversation history.
        
        Args:
            keep_system: Keep the system prompt
        """
        if keep_system and self.system_prompt:
            self.history = [{"role": "system", "content": self.system_prompt}]
        else:
            self.history = []
    
    def get_history(self) -> List[Dict[str, Any]]:
        """
        Get the full conversation history.
        
        Returns:
            List of conversation messages
        """
        return self.history
    
    def get_performance_metrics(self) -> Dict[str, Any]:
        """
        Get performance metrics for this model.
        
        Returns:
            Performance metrics
        """
        for name, data in self.benchmark_data.items():
            if self.model_name in name:
                return data
        return {}


# Usage example:
if __name__ == "__main__":
    # Initialize the factory
    factory = LLMFactory(site_url="example.com", site_name="Example App")
    
    # Create a GPT model instance
    gpt = factory.createGPT(temperature=0.7)
    
    # Ask a question
    response = gpt.ask("Hello, what can you help me with today?")
    print(f"GPT Response: {response}")
    
    # Create a Claude model instance
    claude = factory.createClaude()
    
    # Set a custom system prompt
    claude.set_system_prompt("You are Claude, a helpful and harmless AI assistant.")
    
    # Ask a question
    response = claude.ask("Tell me about artificial intelligence.")
    print(f"Claude Response: {response}")
