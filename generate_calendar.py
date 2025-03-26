import sqlite3
import pandas as pd
from datetime import datetime
import re

def extract_assignments(content):
    """Extract assignments and dates from content using GPT-like pattern matching"""
    # Common patterns for assignments
    patterns = [
        r'(\w+)\s+(\d+)\s+(\w+)\s+(\d{4})\s*[-–]\s*(.*?)(?=\n|$)',  # Date - Assignment
        r'(\w+)\s+(\d+)\s+(\w+)\s+(\d{4})\s*:\s*(.*?)(?=\n|$)',     # Date: Assignment
        r'(\w+)\s+(\d+)\s+(\w+)\s+(\d{4})\s+(.*?)(?=\n|$)',         # Date Assignment
        r'(\w+)\s+(\d+)\s+(\w+)\s+(\d{4})\s*Due\s*:\s*(.*?)(?=\n|$)' # Date Due: Assignment
    ]
    
    assignments = []
    for pattern in patterns:
        matches = re.finditer(pattern, content, re.IGNORECASE)
        for match in matches:
            day, date, month, year, assignment = match.groups()
            try:
                # Convert date string to datetime
                date_str = f"{month} {date}, {year}"
                date_obj = datetime.strptime(date_str, "%B %d, %Y")
                assignments.append({
                    'Date': date_obj.strftime("%A, %B %d, %Y"),
                    'Assignment': assignment.strip()
                })
            except ValueError:
                continue
    
    return assignments

def main():
    # Connect to database
    conn = sqlite3.connect('scraped_data.db')
    c = conn.cursor()
    
    # Get all content from database
    c.execute('SELECT content FROM scraped_data')
    rows = c.fetchall()
    conn.close()
    
    # Process all content
    all_assignments = []
    for row in rows:
        content = row[0]
        assignments = extract_assignments(content)
        all_assignments.extend(assignments)
    
    # Convert to DataFrame and sort by date
    df = pd.DataFrame(all_assignments)
    if not df.empty:
        df['Date'] = pd.to_datetime(df['Date'])
        df = df.sort_values('Date')
        df['Date'] = df['Date'].dt.strftime("%A, %B %d, %Y")
        
        # Save to CSV
        df.to_csv('calendar.csv', index=False, sep='\t')
        print("Calendar CSV generated successfully!")
    else:
        print("No assignments found in the database content.")

if __name__ == "__main__":
    main() 