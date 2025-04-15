import os
from models import LLMFactory, ModelInstance

def main():
    # Initialize the LLM factory
    # Replace with your actual site information
    factory = LLMFactory(
        site_url="https://myapp.com",
        site_name="My AI Application"
    )
    
    print("LLM Interface initialized with OpenRouter API")
    
    # Example 1: Basic usage with GPT
    print("\n=== Example 1: Basic GPT Usage ===")
    gpt = factory.createGPT()
    response = gpt.ask("What are the top 3 programming languages in 2025?")
    print(f"GPT Response: {response}\n")
    
    # Example 2: Conversation with Claude
    print("\n=== Example 2: Conversation with Claude ===")
    claude = factory.createClaude(temperature=0.3)  # Lower temperature for more focused responses
    claude.set_system_prompt("You are Claude, a helpful AI assistant specialized in explaining complex topics simply.")
    
    # First question
    response1 = claude.ask("Can you explain quantum computing in simple terms?")
    print(f"Question 1: Can you explain quantum computing in simple terms?")
    print(f"Claude Response: {response1}\n")
    
    # Follow-up question (uses conversation history)
    response2 = claude.ask("What are its potential applications?")
    print(f"Question 2: What are its potential applications?")
    print(f"Claude Response: {response2}\n")
    
    # Example 3: Using Gemini with images
    print("\n=== Example 3: Multimodal with Gemini ===")
    gemini = factory.createGemini()
    
    # Using an image URL - replace with an actual image URL if you want to test
    image_url = "https://example.com/image.jpg"
    print(f"Question: What can you tell me about this image? (using {image_url})")
    print("Note: This is just a demonstration - replace with a real image URL to test")
    
    # Uncomment to test with a real image URL
    # response = gemini.ask("What can you tell me about this image?", images=[image_url])
    # print(f"Gemini Response: {response}\n")
    
    # Example 4: Using different models with the same prompt
    print("\n=== Example 4: Model Comparison ===")
    models = {
        "GPT": factory.createGPT(),
        "Claude": factory.createClaude(),
        "Llama": factory.createLlama(),
        "Qwen": factory.createQwen()
    }
    
    comparison_prompt = "Write a short poem about artificial intelligence."
    print(f"Prompt for all models: '{comparison_prompt}'")
    
    for name, model in models.items():
        print(f"\n--- {name} Response ---")
        response = model.ask(comparison_prompt)
        print(response)
    
    # Example 5: Using streaming for long responses
    print("\n=== Example 5: Streaming Response ===")
    deepseek = factory.createDeepSeek()
    print("DeepSeek streaming response (simulated, actual streaming would display progressively):")
    response = deepseek.stream("Explain how to implement a basic neural network from scratch.")
    print(f"DeepSeek Response (length: {len(response)} characters)")
    print(response[:200] + "..." if len(response) > 200 else response)
    
    # Example 6: Setting different parameters
    print("\n=== Example 6: Parameter Customization ===")
    creative_gpt = factory.createGPT(
        temperature=0.9,  # Higher temperature for more creative responses
        top_p=0.95,
        frequency_penalty=0.5,
        presence_penalty=0.5
    )
    
    precise_gpt = factory.createGPT(
        temperature=0.1,  # Lower temperature for more deterministic responses
        top_p=0.5,
        frequency_penalty=0.0,
        presence_penalty=0.0
    )
    
    prompt = "Generate 3 startup ideas"
    
    print("Creative GPT (high temperature):")
    creative_response = creative_gpt.ask(prompt)
    print(creative_response)
    
    print("\nPrecise GPT (low temperature):")
    precise_response = precise_gpt.ask(prompt)
    print(precise_response)

if __name__ == "__main__":
    main()
