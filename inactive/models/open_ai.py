import os
from dotenv import load_dotenv
from openai import OpenAI

# Load environment variables from the .env file
load_dotenv()

class GPT:
    def __init__(self, api_key=None, system_prompt=None, default_model="gpt-4", default_temperature=0.7, default_frequency_penalty=0.0):
        """
        Initialize the GPT class with default parameters.

        Args:
            api_key (str): Your OpenAI API key.
            system_prompt (str): The system prompt for context, set during initialization.
            default_model (str): Default model to use for API calls.
            default_temperature (float): Default sampling temperature for the model.
            default_frequency_penalty (float): Default frequency penalty for the model.
        """
        self.api_key = api_key or os.getenv("OPENAI_API_KEY")
        if not self.api_key:
            raise ValueError("OPENAI_API_KEY is not set in environment variables or provided as a parameter.")

        # Initialize the OpenAI client
        self.client = OpenAI(api_key=self.api_key)
        
        # Store the system prompt
        self.system_prompt = system_prompt
        self.default_model = default_model
        self.default_temperature = default_temperature
        self.default_frequency_penalty = default_frequency_penalty

    def generate_response(self, user_prompt, dynamic_inputs=None, model=None, temperature=None, frequency_penalty=None):
        """
        Call the OpenAI GPT API with dynamic and static prompts.

        Args:
            user_prompt (str): The user prompt to guide the response.
            dynamic_inputs (dict): Key-value pairs to dynamically populate the user prompt.
            model (str): Model to use (optional, defaults to class default).
            temperature (float): Sampling temperature (optional, defaults to class default).
            frequency_penalty (float): Frequency penalty (optional, defaults to class default).

        Returns:
            str: The assistant's response.
        """
        try:
            # Use defaults if specific values are not provided
            model = model or self.default_model
            temperature = temperature if temperature is not None else self.default_temperature
            frequency_penalty = frequency_penalty if frequency_penalty is not None else self.default_frequency_penalty

            # Populate the user prompt with dynamic inputs if provided
            if dynamic_inputs:
                user_prompt += "".join([f"\n{key}: {value}" for key, value in dynamic_inputs.items()])

            # Prepare the messages for the API using the stored system prompt
            messages = [
                {"role": "system", "content": self.system_prompt},
                {"role": "user", "content": user_prompt}
            ]

            # Call the OpenAI API with virtually infinite max_tokens
            response = self.client.chat.completions.create(
                model=model,
                messages=messages,
                temperature=temperature,
                max_tokens=4096,  # Maximum token limit for most GPT-4 models
                frequency_penalty=frequency_penalty
            )

            # Extract response text
            response_text = response.choices[0].message.content
            tokens_used = response.usage.total_tokens

            print("Response:")
            print(response_text)
            print(f"Tokens used: {tokens_used}")

            return response_text

        except Exception as e:
            print(f"Error while calling OpenAI API: {e}")
            return None
        
# Initialize the GPT class with a system prompt
gpt = GPT(
    api_key=os.getenv("OPENAI_API_KEY"),
    system_prompt="You are a helpful assistant."
)

# Generate a response by passing only the user prompt
gpt_response = gpt.generate_response(
    user_prompt="Tell me a fun fact about space."
)