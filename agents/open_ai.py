import os
from openai import OpenAI

from dotenv import load_dotenv

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

class GPT:
    def __init__(self, api_key=None, default_model="gpt-4o", default_temperature=0.7, default_max_tokens=1000, default_frequency_penalty=0.0):
        """
        Initialize the GPT class with default parameters.

        Args:
            api_key (str): Your OpenAI API key.
            default_model (str): Default model to use for API calls.
            default_temperature (float): Default sampling temperature for the model.
            default_max_tokens (int): Default maximum tokens to generate.
            default_frequency_penalty (float): Default frequency penalty for the model.
        """
        self.api_key = api_key or os.getenv("OPENAI_API_KEY")
        if not self.api_key:
            raise ValueError("OPENAI_API_KEY is not set in environment variables or provided as a parameter.")

        self.default_model = default_model
        self.default_temperature = default_temperature
        self.default_max_tokens = default_max_tokens
        self.default_frequency_penalty = default_frequency_penalty

    def call(self, system_prompt, user_prompt, dynamic_inputs=None, model=None, temperature=None, max_tokens=None, frequency_penalty=None):
        """
        Call the OpenAI GPT API with dynamic and static prompts.

        Args:
            system_prompt (str): The system prompt for context.
            user_prompt (str): The user prompt to guide the response.
            dynamic_inputs (dict): Key-value pairs to dynamically populate the user prompt.
            model (str): Model to use (optional, defaults to class default).
            temperature (float): Sampling temperature (optional, defaults to class default).
            max_tokens (int): Maximum number of tokens to generate (optional, defaults to class default).
            frequency_penalty (float): Frequency penalty (optional, defaults to class default).

        Returns:
            str: The assistant's response.
        """
        try:
            # Use defaults if specific values are not provided
            model = model or self.default_model
            temperature = temperature if temperature is not None else self.default_temperature
            max_tokens = max_tokens or self.default_max_tokens
            frequency_penalty = frequency_penalty if frequency_penalty is not None else self.default_frequency_penalty

            # Populate the user prompt with dynamic inputs if provided
            if dynamic_inputs:
                user_prompt += "".join([f"\n{key}: {value}" for key, value in dynamic_inputs.items()])

            # Prepare the messages for the API
            messages = [
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ]

            # Call the OpenAI API
            response = client.chat.completions.create(model=model,
            messages=messages,
            temperature=temperature,
            max_tokens=max_tokens,
            frequency_penalty=frequency_penalty)

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




# Initialize the GPT class
gpt = GPT(api_key=os.getenv("OPENAI_API_KEY"))
gpt_response = gpt.call(
    system_prompt="You are a helpful assistant.",
    user_prompt="Tell me a fun fact about space."
)

# # Initialize the Gemini class
# gemini = Gemini(api_key=os.getenv("GEMINI_API_KEY"))
# gemini_response = gemini.call(prompt="Tell me a fun fact about space.")

# # Initialize the Anthropic class
# anthropic = Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))
# anthropic_response = anthropic.call(prompt="Tell me a fun fact about space.")