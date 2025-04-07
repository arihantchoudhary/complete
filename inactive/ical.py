def generate_ical_file(events_text):
    """
    Generate an iCal file from the events text extracted by GPT
    with improved date and time accuracy
    """
    ical_gpt = GPT(
        api_key=os.getenv("OPENAI_API_KEY"),
        system_prompt="""
        You are an assistant that converts event descriptions into structured iCal event data.
        For each event, carefully extract:
        - Event Name
        - Precise Start Date (YYYY-MM-DD)
        - Precise Start Time (HH:MM, 24-hour format)
        - Optional End Time (HH:MM, 24-hour format)
        - Optional Location (if mentioned in the text)
        
        IMPORTANT RULES:
        1. Use the CURRENT YEAR if no year is specified
        2. If no specific date is found, do NOT include the event
        3. If time is ambiguous, prefer more recent/future times
        4. Validate that extracted dates make sense
        
        Format your response as a JSON array of event objects:
        [
            {
                "name": "Event Name",
                "start_date": "2024-03-26",
                "start_time": "14:30",
                "end_time": "16:00", // optional
                "location": "Event Location" // optional
            },
            ...
        ]
        """
    )
    
    # Generate structured event data
    events_json = ical_gpt.generate_response(
        user_prompt=f"Convert these events to structured JSON, using the current year if not specified:\n{events_text}"
    )
    
    # Generate iCal file
    ical_content = "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Custom Event Extractor//EN\n"
    
    try:
        import json
        from datetime import datetime, timedelta
        
        current_year = datetime.now().year
        parsed_events = json.loads(events_json)
        
        for event in parsed_events:
            # Validate and correct date
            if 'start_date' not in event:
                continue  # Skip events without a date
            
            # Add current year if not specified
            if len(event['start_date'].split('-')[0]) != 4:
                event['start_date'] = f"{current_year}-{event['start_date']}"
            
            try:
                # Parse the date, ensuring it's valid
                start_date = datetime.strptime(event['start_date'], "%Y-%m-%d")
                
                # Ensure date is not in the distant past or too far in the future
                min_date = datetime.now() - timedelta(days=365*2)
                max_date = datetime.now() + timedelta(days=365*2)
                
                if start_date < min_date or start_date > max_date:
                    continue  # Skip invalid dates
                
                # Generate iCal event
                event_id = str(uuid.uuid4())
                ical_content += "BEGIN:VEVENT\n"
                ical_content += f"UID:{event_id}\n"
                ical_content += f"SUMMARY:{event.get('name', 'Unnamed Event')}\n"
                
                # Date formatting
                ical_content += f"DTSTART:{start_date.strftime('%Y%m%d')}"
                
                # Time handling
                if 'start_time' in event:
                    try:
                        start_time = datetime.strptime(event['start_time'], "%H:%M")
                        ical_content += f"T{start_time.strftime('%H%M%S')}Z\n"
                    except ValueError:
                        # Fallback for potentially malformed time
                        ical_content += "\n"
                else:
                    ical_content += "\n"
                
                # End time handling
                if 'end_time' in event:
                    try:
                        end_time = datetime.strptime(event['end_time'], "%H:%M")
                        ical_content += f"DTEND:{start_date.strftime('%Y%m%d')}T{end_time.strftime('%H%M%S')}Z\n"
                    except ValueError:
                        # Skip if end time is invalid
                        pass
                
                # Location
                if 'location' in event:
                    ical_content += f"LOCATION:{event.get('location')}\n"
                
                ical_content += "END:VEVENT\n"
            
            except ValueError:
                # Skip events with invalid date formats
                continue
        
        ical_content += "END:VCALENDAR"
        
        return ical_content
    
    except Exception as e:
        st.error(f"Error generating iCal file: {e}")
        return None