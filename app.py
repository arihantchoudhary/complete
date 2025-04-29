import os
import json
import requests
import datetime
from pathlib import Path
from dotenv import load_dotenv
from openai import OpenAI

# Load environment variables
load_dotenv()
CARTESIA_API_KEY = os.getenv("CARTESIA_API_KEY", "sk_car_SukLpctGR53PJv6UX4M3N8")
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
    hindi_text = translate_english_to_hindi(english_text)
    audio_path = generate_tts(hindi_text)
    return {
        "english_text": english_text,
        "hindi_text": hindi_text,
        "audio_path": audio_path
    }

# Command-line interface
if __name__ == "__main__":
    import argparse
    
    parser = argparse.ArgumentParser(description="Convert English text to Hindi speech")
    parser.add_argument("--text", type=str, help="English text to convert to Hindi speech")
    
    args = parser.parse_args()
    
    # If no text provided through command line, prompt the user
    if args.text:
        text = args.text
    else:
        text = input("Enter English text to convert to Hindi speech: ")
    
    result = create_hindi_audio_from_english(text)
    print("\nResult:")
    print(f"English: {result['english_text']}")
    print(f"Hindi: {result['hindi_text']}")
    print(f"Audio saved to: {result['audio_path']}")
    print(f"\nTo play the audio file (if you have a compatible player):")
    print(f"open {result['audio_path']}")
