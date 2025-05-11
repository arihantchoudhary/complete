import os
import json
import requests
import datetime
from pathlib import Path
from dotenv import load_dotenv
from openai import OpenAI

# Load environment variables
load_dotenv()
CARTESIA_API_KEY = os.getenv("CARTESIA_API_KEY")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

# Create output directory if it doesn't exist
AUDIO_OUTPUT_DIR = Path("audio_output")
AUDIO_OUTPUT_DIR.mkdir(exist_ok=True)

def translate_english_to_hindi(text):
    """
    Translate English text to Hindi using OpenAI API
    """
    if not OPENAI_API_KEY:
        raise ValueError("OpenAI API Key not found. Please set OPENAI_API_KEY environment variable.")
    
    client = OpenAI(api_key=OPENAI_API_KEY)
    
    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a translator. Translate the following English text to Hindi. Provide only the Hindi translation without any additional text. Make sure you are grammatically correct and fluent. ditch the numbers and talk qualitatively to explain the english. If the input is in Hinglish do not chnage to hindi just skip translate."},
                {"role": "user", "content": text}
            ]
        )
        translated_text = response.choices[0].message.content.strip()
        print(f"Translated text: {translated_text}")
        return translated_text
    except Exception as e:
        print(f"Error during translation: {e}")
        raise

def generate_tts(hindi_text):
    """
    Generate text-to-speech audio using Cartesia API
    """
    url = "https://api.cartesia.ai/tts/bytes"
    
    headers = {
        "Cartesia-Version": "2024-06-10",
        "X-API-Key": CARTESIA_API_KEY,
        "Content-Type": "application/json"
    }
    
    payload = {
        "model_id": "sonic-2",
        "transcript": hindi_text,
        "voice": {
            "mode": "id",
            "id": "fd2ada67-c2d9-4afe-b474-6386b87d8fc3"
        },
        "output_format": {
            "container": "wav",
            "encoding": "pcm_f32le",
            "sample_rate": 44100
        },
        "language": "hi"
    }
    
    try:
        response = requests.post(url, headers=headers, json=payload)
        response.raise_for_status()  # Raise an error for bad status codes
        
        # Generate filename with timestamp
        timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"tts_{timestamp}.wav"
        filepath = AUDIO_OUTPUT_DIR / filename
        
        # Write binary content to file
        with open(filepath, 'wb') as f:
            f.write(response.content)
        
        print(f"Audio saved to: {filepath}")
        return str(filepath)
    except Exception as e:
        print(f"Error generating TTS: {e}")
        raise

def create_hindi_audio_from_english(english_text):
    """
    Main function that takes English text, translates to Hindi, and generates TTS
    """
    print(f"Input English text: {english_text}")
    hindi_text = english_text # translate_english_to_hindi(english_text)
    audio_path = generate_tts(hindi_text)
    return {
        "english_text": english_text,
        "hindi_text": hindi_text,
        "audio_path": audio_path
    }

# Command-line interface
if __name__ == "__main__":
    # Embed the demo transcript directly
    text = """
Thank you for joining this demonstration of City AI's intelligent document processing capabilities. As you can see, we've uploaded the core shipping documents – the Bill of Lading, Packing List, and Commercial Invoice. City AI automatically processes these documents, verifying that they are complete, correctly formatted, and contain all the required details. The system provides an overall verification score and highlights any potential risks or discrepancies within the documents, such as missing signatures or generic goods descriptions that might need more specificity. Furthermore, City AI analyzes the cargo details. In this case, it has identified 'Widget B' which contains lithium batteries, classifying them as hazardous materials (Class 9, UN3481). The system immediately flags the necessary compliance steps, including required documentation like the Shipper's Declaration for Dangerous Goods, specific UN-certified packaging, and Class 9 labeling. It also provides recent regulatory updates relevant to transporting these goods. Because this is an international shipment from Shanghai to Los Angeles, City AI automatically detects this and enables the generation of a Certificate of Origin. With a single click, we can generate this crucial document, pre-filled with verified data from the other documents, ready for download as a PDF. The system also identifies the user's role – in this scenario, ACME Corporation is the shipper, making them the exporter. Based on this, City AI flags the requirement for a Chinese Export License. We've streamlined the process, allowing the user to initiate the application directly from this interface with a click on the 'Apply for License' button, which now shows 'License Application Submitted' to confirm the action. To provide better visibility, we've included a trade route visualization map. This map displays the route from Shanghai to Los Angeles, shows the vessel's current status ('In Transit' for this demo), and provides key details like estimated distance and transit time. Finally, since 'Widget B' requires special handling due to its components, City AI allows us to generate a Shipper's Letter of Instructions. This document details specific requirements like temperature control (10-15°C), humidity levels, and stacking limitations. We can generate this, review it, and send it directly to the shipper, ensuring the cargo is handled correctly throughout its journey. We see a confirmation checkmark once it's sent. This integrated approach demonstrates how City AI not only verifies documents but also proactively manages compliance, facilitates necessary documentation, and provides valuable insights like risk assessment, insurance recommendations, and shipment visualization, significantly streamlining the complexities of international trade.
"""
    
    result = create_hindi_audio_from_english(text)
    print("\nResult:")
    print(f"English: {result['english_text']}")
    print(f"Hindi: {result['hindi_text']}")
    print(f"Audio saved to: {result['audio_path']}")
    print(f"\nTo play the audio file (if you have a compatible player):")
    print(f"open {result['audio_path']}")
