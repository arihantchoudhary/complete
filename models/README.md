# LLM Interface for OpenRouter

A Python interface for interacting with various language models through the OpenRouter API. This package provides a unified interface for accessing multiple LLM providers including OpenAI GPT, Anthropic Claude, Google Gemini, Meta Llama, DeepSeek, Qwen, and Sonar.

## Features

- **Unified API**: Consistent interface for all supported models
- **Conversation Management**: Maintains chat history for contextual conversations
- **Multimodal Support**: Text and image inputs for compatible models
- **Parameter Customization**: Fine-tune model behavior with extensive parameter options
- **Performance Tracking**: Integration with benchmark data (requires external API setup)
- **Streaming Support**: Stream responses for better user experience

## Installation

1. Ensure you have Python 3.7+ installed
2. Install required dependencies:

```bash
pip install openai python-dotenv requests
```

3. Create a `.env` file in your project directory with your OpenRouter API key:

```
OPENROUTER_API_KEY="your-openrouter-api-key"
```

## Quick Start

```python
from models import LLMFactory

# Initialize the factory
factory = LLMFactory(site_url="yourapp.com", site_name="Your App Name")

# Create a GPT model instance
gpt = factory.createGPT()

# Ask a question
response = gpt.ask("What are the top 3 programming languages in 2025?")
print(f"Response: {response}")

# Create a Claude model and have a conversation
claude = factory.createClaude(temperature=0.3)
claude.set_system_prompt("You are a helpful AI assistant.")

# First question
response1 = claude.ask("What is machine learning?")
print(f"Response 1: {response1}")

# Follow-up (with conversation history)
response2 = claude.ask("Give me some practical applications.")
print(f"Response 2: {response2}")
```

## Available Models

- **GPT**: `createGPT()` - OpenAI's GPT models
- **Claude**: `createClaude()` - Anthropic's Claude models
- **Gemini**: `createGemini()` - Google's Gemini models
- **Llama**: `createLlama()` - Meta's Llama models
- **DeepSeek**: `createDeepSeek()` - DeepSeek models
- **Qwen**: `createQwen()` - Qwen models
- **Sonar**: `createSonar()` - Sonar models

## LLMFactory Class

The factory class creates model instances and manages global configurations.

### Initialization

```python
factory = LLMFactory(
    site_url="",       # Your site URL for OpenRouter attribution (optional)
    site_name="",      # Your site name for OpenRouter attribution (optional)
    api_key_path=".env"  # Path to .env file with OPENROUTER_API_KEY
)
```

### Methods

- `createXXX(model_name=None, **params)` - Create a model instance (XXX is the model name)
- `update_benchmark_data(force=False)` - Update performance benchmark data
- `get_model_performance(model_name)` - Get performance metrics for a specific model

## ModelInstance Class

Each model instance represents a stateful conversation with a specific model.

### Methods

- `ask(prompt, images=None, stream=False, **params)` - Send a prompt and get a response
- `stream(prompt, images=None, **params)` - Stream a response from the model
- `set_system_prompt(system_prompt)` - Set or update the system prompt
- `set_context_length(max_tokens)` - Set the maximum response length
- `clear_history(keep_system=True)` - Clear conversation history
- `get_history()` - Get the full conversation history
- `get_performance_metrics()` - Get performance metrics for this model

### Parameters

Common parameters you can set when creating a model or during an `ask()` call:

- `temperature` - Controls randomness (0.0 to 1.0)
- `max_tokens` - Maximum tokens to generate
- `top_p` - Nucleus sampling parameter
- `frequency_penalty` - Penalty for repeating tokens
- `presence_penalty` - Penalty for repeating topics

## Benchmark Data Integration

The system is designed to work with an external benchmarking API. The benchmarking API integration is currently a placeholder that you'll need to implement:

```python
# Update the update_benchmark_data method in LLMFactory class
def update_benchmark_data(self, force: bool = False):
    # Replace with your actual benchmark API endpoint
    api_url = "https://your-benchmark-api.com/latest"
    # Implementation...
```

## Examples

See the `example.py` file for detailed usage examples including:

1. Basic API calls
2. Multi-turn conversations
3. Multimodal inputs with images
4. Model comparison
5. Response streaming
6. Parameter customization

## Extending the Codebase

### Adding a New Model

To add support for a new LLM provider:

1. Add the model's default identifier in the `model_mappings` dictionary in `LLMFactory.__init__()`
2. Create a new create method in `LLMFactory` (follow the pattern of existing methods)
3. The implementation should instantiate and return a new `ModelInstance`

### Customizing the Benchmark System

To implement your own benchmark tracking:

1. Modify the `update_benchmark_data` method in `LLMFactory`
2. Update the `get_model_performance` and `get_performance_metrics` methods as needed

## Troubleshooting

- **API Key Issues**: Ensure your OpenRouter API key is properly set in the `.env` file
- **Model Availability**: Check that the requested model is available on OpenRouter
- **Rate Limits**: Handle API rate limits by implementing appropriate error handling
- **Large Responses**: For large responses, consider using the streaming API

## License

MIT
