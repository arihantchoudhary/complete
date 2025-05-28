# pk.eyJ1IjoiYXJpaGFudGNob3VkaGFyeSIsImEiOiJjbThvNmZtdWgwOG5iMmlwemJpcnRudjd3In0.JmygHU07dAryo96ZLH3uAA

# fsq3LeErnxKbYgrUQ+c//D1scTlkpKbRSnOr/sG4uOdFB5w=

import streamlit as st
import requests
import pandas as pd
import pydeck as pdk
import os
from dotenv import load_dotenv
import json
import random
import string

# Load environment variables
load_dotenv()

# Set your API keys here
FSQ_API_KEY = os.getenv('FSQ_API_KEY', 'fsq3LeErnxKbYgrUQ+c//D1scTlkpKbRSnOr/sG4uOdFB5w=')
MAPBOX_TOKEN = os.getenv('MAPBOX_TOKEN', 'pk.eyJ1IjoiYXJpaGFudGNob3VkaGFyeSIsImEiOiJjbThvNmZtdWgwOG5iMmlwemJpcnRudjd3In0.JmygHU07dAryo96ZLH3uAA')

# Validate tokens
def validate_tokens():
    if not FSQ_API_KEY or FSQ_API_KEY == 'YOUR_FSQ_API_TOKEN':
        st.error("⚠️ Foursquare API Token is missing or invalid. Please set your FSQ_API_KEY in the .env file.")
        return False
    
    if not MAPBOX_TOKEN or MAPBOX_TOKEN == 'YOUR_MAPBOX_ACCESS_TOKEN':
        st.error("⚠️ Mapbox Access Token is missing or invalid. Please set your MAPBOX_TOKEN in the .env file.")
        return False
    
    # Test Foursquare API
    try:
        headers = {"Authorization": FSQ_API_KEY}
        test_response = requests.get(
            "https://api.foursquare.com/v3/places/search",
            params={"query": "test", "limit": 1},
            headers=headers
        )
        if test_response.status_code != 200:
            st.error("⚠️ Foursquare API Token validation failed. Please check your token.")
            return False
    except Exception as e:
        st.error(f"⚠️ Error validating Foursquare API Token: {str(e)}")
        return False
    
    return True

# Configure the page
st.set_page_config(
    page_title="Maritime Port Search",
    page_icon="⚓",
    layout="wide"
)

# Generate session token
def generate_session_token(length=32):
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k=length))

# Initialize session state
if 'session_token' not in st.session_state:
    st.session_state.session_token = generate_session_token()

# Default coordinates (center of the world map)
DEFAULT_LAT = 0
DEFAULT_LON = 0

# Initialize location in session state
if 'user_location' not in st.session_state:
    st.session_state.user_location = {
        'lat': DEFAULT_LAT,
        'lon': DEFAULT_LON
    }

st.title("Maritime Port Search")

# Token validation
if not validate_tokens():
    st.stop()

# Sidebar for map controls and token info
with st.sidebar:
    st.title("Map Controls")
    
    # Display token status
    st.subheader("API Status")
    st.success("✅ Foursquare API: Connected")
    st.success("✅ Mapbox API: Connected")
    
    # Map style selector
    map_style = st.selectbox(
        "Map Style",
        ["mapbox://styles/mapbox/navigation-night-v1",  # Dark navigation style
         "mapbox://styles/mapbox/navigation-day-v1",    # Light navigation style
         "mapbox://styles/mapbox/satellite-streets-v12"] # Satellite view
    )

# Search input with autocomplete
search_query = st.text_input("Search for a location:", key="search_input")

if search_query:
    # First, try to get the location coordinates
    headers = {"Authorization": FSQ_API_KEY}
    
    # Try direct place search first
    place_params = {
        "query": search_query,
        "limit": 1
    }
    
    try:
        # First attempt: Direct place search
        place_response = requests.get(
            "https://api.foursquare.com/v3/places/search",
            params=place_params,
            headers=headers
        )
        place_data = place_response.json()
        
        if place_data.get("results"):
            # We found a direct match
            place = place_data["results"][0]
            lat = place["geocodes"]["main"]["latitude"]
            lon = place["geocodes"]["main"]["longitude"]
            st.session_state.user_location = {'lat': lat, 'lon': lon}
            
            # Search for maritime facilities
            maritime_queries = [
                "port authority",
                "shipping port",
                "cargo port",
                "container port",
                "ferry terminal",
                "cruise terminal",
                "maritime terminal",
                "harbor master",
                "dockyard",
                "shipyard"
            ]
            
            all_facilities = []
            for query in maritime_queries:
                port_params = {
                    "query": query,
                    "ll": f"{lat},{lon}",
                    "radius": 20000,
                    "limit": 20
                }
                port_resp = requests.get(
                    "https://api.foursquare.com/v3/places/search",
                    params=port_params,
                    headers=headers
                )
                facilities = port_resp.json().get("results", [])
                maritime_facilities = [
                    f for f in facilities 
                    if any(term in f.get("name", "").lower() or 
                          any(term in cat.get("name", "").lower() 
                              for cat in f.get("categories", []))
                          for term in ["port", "harbor", "maritime", "dock", "ship", "ferry", "terminal"])
                ]
                all_facilities.extend(maritime_facilities)

            # Remove duplicates
            unique_facilities = {f["fsq_id"]: f for f in all_facilities}.values()

            # Display results
            if unique_facilities:
                # Create two columns
                col1, col2 = st.columns([1, 2])
                
                with col1:
                    # Display facilities table
                    facility_df = pd.DataFrame([{
                        "Name": f["name"],
                        "Type": f["categories"][0]["name"] if f.get("categories") else "Maritime Facility",
                        "Address": ", ".join(f["location"].get("formatted_address", [])),
                        "Distance": f"{f['distance']}m"
                    } for f in unique_facilities])
                    st.dataframe(facility_df)
                
                with col2:
                    # Create map
                    map_data = pd.DataFrame([{
                        "lat": lat,
                        "lon": lon,
                        "type": "Search Location",
                        "name": place["name"]
                    }] + [{
                        "lat": f["geocodes"]["main"]["latitude"],
                        "lon": f["geocodes"]["main"]["longitude"],
                        "type": "Maritime Facility",
                        "name": f["name"]
                    } for f in unique_facilities])

                    st.pydeck_chart(pdk.Deck(
                        map_style=map_style,
                        initial_view_state=pdk.ViewState(
                            latitude=lat,
                            longitude=lon,
                            zoom=11,
                            pitch=45
                        ),
                        layers=[
                            pdk.Layer(
                                "ScatterplotLayer",
                                data=map_data[map_data["type"] == "Search Location"],
                                get_position="[lon, lat]",
                                get_color="[255, 0, 0, 160]",
                                get_radius=200,
                                pickable=True,
                                auto_highlight=True
                            ),
                            pdk.Layer(
                                "ScatterplotLayer",
                                data=map_data[map_data["type"] == "Maritime Facility"],
                                get_position="[lon, lat]",
                                get_color="[0, 128, 255, 160]",
                                get_radius=100,
                                pickable=True,
                                auto_highlight=True
                            )
                        ],
                        tooltip={
                            "text": "{name}\n{type}"
                        }
                    ))
            else:
                st.write("No maritime facilities found near this location.")
        else:
            # If direct search fails, try autocomplete
            autocomplete_params = {
                "query": search_query,
                "types": "place",
                "ll": f"{st.session_state.user_location['lat']},{st.session_state.user_location['lon']}",
                "radius": 50000,
                "session_token": st.session_state.session_token
            }
            
            autocomplete_response = requests.get(
                "https://api.foursquare.com/v3/autocomplete",
                params=autocomplete_params,
                headers=headers
            )
            autocomplete_data = autocomplete_response.json()
            
            if autocomplete_data.get("results"):
                st.subheader("Search Results")
                for result in autocomplete_data["results"]:
                    if result.get("place"):
                        place = result["place"]
                        if st.button(f"{place.get('name', '')} - {place.get('location', {}).get('formatted_address', '')}"):
                            # Get place details and process as before
                            place_id = place.get("fsq_id")
                            details_response = requests.get(
                                f"https://api.foursquare.com/v3/places/{place_id}",
                                params={"fields": "fsq_id,name,geocodes,location,photos,rating"},
                                headers=headers
                            )
                            place_details = details_response.json()
                            
                            # Extract coordinates and update session state
                            lat = place_details["geocodes"]["main"]["latitude"]
                            lon = place_details["geocodes"]["main"]["longitude"]
                            st.session_state.user_location = {'lat': lat, 'lon': lon}
                            
                            # Search for maritime facilities
                            maritime_queries = [
                                "port authority",
                                "shipping port",
                                "cargo port",
                                "container port",
                                "ferry terminal",
                                "cruise terminal",
                                "maritime terminal",
                                "harbor master",
                                "dockyard",
                                "shipyard"
                            ]
                            
                            all_facilities = []
                            for query in maritime_queries:
                                port_params = {
                                    "query": query,
                                    "ll": f"{lat},{lon}",
                                    "radius": 20000,
                                    "limit": 20
                                }
                                port_resp = requests.get(
                                    "https://api.foursquare.com/v3/places/search",
                                    params=port_params,
                                    headers=headers
                                )
                                facilities = port_resp.json().get("results", [])
                                maritime_facilities = [
                                    f for f in facilities 
                                    if any(term in f.get("name", "").lower() or 
                                          any(term in cat.get("name", "").lower() 
                                              for cat in f.get("categories", []))
                                          for term in ["port", "harbor", "maritime", "dock", "ship", "ferry", "terminal"])
                                ]
                                all_facilities.extend(maritime_facilities)

                            # Remove duplicates
                            unique_facilities = {f["fsq_id"]: f for f in all_facilities}.values()

                            # Display results
                            if unique_facilities:
                                # Create two columns
                                col1, col2 = st.columns([1, 2])
                                
                                with col1:
                                    # Display facilities table
                                    facility_df = pd.DataFrame([{
                                        "Name": f["name"],
                                        "Type": f["categories"][0]["name"] if f.get("categories") else "Maritime Facility",
                                        "Address": ", ".join(f["location"].get("formatted_address", [])),
                                        "Distance": f"{f['distance']}m"
                                    } for f in unique_facilities])
                                    st.dataframe(facility_df)
                                
                                with col2:
                                    # Create map
                                    map_data = pd.DataFrame([{
                                        "lat": lat,
                                        "lon": lon,
                                        "type": "Search Location",
                                        "name": place_details["name"]
                                    }] + [{
                                        "lat": f["geocodes"]["main"]["latitude"],
                                        "lon": f["geocodes"]["main"]["longitude"],
                                        "type": "Maritime Facility",
                                        "name": f["name"]
                                    } for f in unique_facilities])

                                    st.pydeck_chart(pdk.Deck(
                                        map_style=map_style,
                                        initial_view_state=pdk.ViewState(
                                            latitude=lat,
                                            longitude=lon,
                                            zoom=11,
                                            pitch=45
                                        ),
                                        layers=[
                                            pdk.Layer(
                                                "ScatterplotLayer",
                                                data=map_data[map_data["type"] == "Search Location"],
                                                get_position="[lon, lat]",
                                                get_color="[255, 0, 0, 160]",
                                                get_radius=200,
                                                pickable=True,
                                                auto_highlight=True
                                            ),
                                            pdk.Layer(
                                                "ScatterplotLayer",
                                                data=map_data[map_data["type"] == "Maritime Facility"],
                                                get_position="[lon, lat]",
                                                get_color="[0, 128, 255, 160]",
                                                get_radius=100,
                                                pickable=True,
                                                auto_highlight=True
                                            )
                                        ],
                                        tooltip={
                                            "text": "{name}\n{type}"
                                        }
                                    ))
                            else:
                                st.write("No maritime facilities found near this location.")
            else:
                st.write("No results found. Please try a different search term or be more specific with the address.")
    except Exception as e:
        st.error(f"Error occurred: {str(e)}")

st.markdown("""
**About:**
This app provides an interactive search for maritime facilities:
- Search for any location worldwide
- View autocomplete suggestions
- See nearby maritime facilities
- Interactive map with facility locations
- Detailed information about each facility

**Features:**
- Real-time search suggestions
- Interactive map markers
- Facility details and distances
- Multiple map styles
- Session-based search tracking
- Global location support

**Setup Requirements:**
1. Mapbox Access Token (get it from [Mapbox](https://account.mapbox.com/))
2. Foursquare API Token (get it from [Foursquare](https://developer.foursquare.com/))
3. Add these tokens to your `.env` file:
   ```
   MAPBOX_TOKEN=your_mapbox_token
   FSQ_API_KEY=your_foursquare_token
   ```
""")
