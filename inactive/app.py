import streamlit as st
import requests
from bs4 import BeautifulSoup
import io
import PyPDF2
import os
from models.open_ai import GPT
import datetime
import uuid
from ical import generate_ical_file

def extract_text(url):
    if url.lower().endswith('.pdf'):
        r = requests.get(url)
        pdf_file = io.BytesIO(r.content)
        reader = PyPDF2.PdfReader(pdf_file)
        text = "".join(page.extract_text() for page in reader.pages)
    else:
        r = requests.get(url)
        soup = BeautifulSoup(r.text, 'html.parser')
        text = soup.get_text()
    return text

def chunk_text(text, max_chars=4000):
    """
    Splits the text into chunks with at most max_chars characters.
    Splitting is done on newline boundaries where possible.
    """
    paragraphs = text.splitlines()
    chunks = []
    current_chunk = ""
    
    for para in paragraphs:
        # If adding this paragraph exceeds the limit, finalize the current chunk.
        if len(current_chunk) + len(para) + 1 > max_chars:
            chunks.append(current_chunk)
            current_chunk = para + "\n"
        else:
            current_chunk += para + "\n"
    if current_chunk:
        chunks.append(current_chunk)
    return chunks

st.title("Web & PDF Text Extractor with GPT Chunking")

# URL Input
url = st.text_input("Enter a website or PDF URL:")

# GPT Initialization for Event Extraction
data_to_event_gpt = GPT(
    api_key=os.getenv("OPENAI_API_KEY"),
    system_prompt="You are an assistant that reads extracted webpages and returns a list of dates, times with event names from the extracted text."
)

if url:
    st.write("Extracting text...")
    text = extract_text(url)
    st.text_area("Extracted Text", text, height=300)
    
    st.write("Splitting text into manageable chunks...")
    chunks = chunk_text(text, max_chars=4000)
    st.write(f"Total chunks: {len(chunks)}")
    
    # Generate GPT response based on each chunk
    st.write("Generating GPT Response for each chunk...")
    responses = []
    for idx, chunk in enumerate(chunks):
        st.write(f"Processing chunk {idx+1}/{len(chunks)}...")
        chunk_response = data_to_event_gpt.generate_response(
            user_prompt=f"Analyze the following text and extract key events (date, time, event name): {chunk}"
        )
        responses.append(chunk_response)
    
    # Combine responses
    final_response = "\n\n".join(responses)
    
    # Display GPT Response
    st.subheader("GPT Analysis")
    st.write(final_response)
    
    # Generate iCal File
    st.subheader("iCal File Generation")
    ical_content = generate_ical_file(final_response)
    
    if ical_content:
        # Offer download of iCal file
        st.download_button(
            label="Download iCal File",
            data=ical_content,
            file_name="extracted_events.ics",
            mime="text/calendar"
        )


