import streamlit as st
import pandas as pd
import os
from serper import SerperAgent

def format_search_results(results):
    """Format the search results into a pandas DataFrame."""
    if not results or 'organic' not in results:
        return pd.DataFrame()
    
    formatted_results = []
    for item in results['organic']:
        formatted_results.append({
            'Title': item.get('title', ''),
            'Link': item.get('link', ''),
            'Snippet': item.get('snippet', ''),
            'Position': item.get('position', '')
        })
    
    return pd.DataFrame(formatted_results)

def main():
    st.set_page_config(
        page_title="Serper Search",
        page_icon="🔍",
        layout="wide"
    )
    
    st.title("🔍 Serper Search")
    st.write("Search the web using the Serper API")
    
    # Sidebar for API key input
    with st.sidebar:
        st.header("Settings")
        api_key = st.text_input(
            "Enter your Serper API Key", 
            type="password",
            value=os.getenv("SERPER_API_KEY", "")  # Use environment variable with empty string as fallback
        )
        st.caption("Get your API key from https://serper.dev")
    
    # Main search interface
    search_query = st.text_input("Enter your search query", 
                               value="Glendo Elementary En 3rd, 82213 Glendo")
    
    if st.button("Search") and search_query and api_key:
        with st.spinner("Searching..."):
            try:
                agent = SerperAgent(api_key=api_key)
                results = agent.search(search_query)
                
                # Display search parameters
                st.subheader("Search Parameters")
                if 'searchParameters' in results:
                    st.json(results['searchParameters'])
                
                # Display organic results in a table
                st.subheader("Search Results")
                df = format_search_results(results)
                if not df.empty:
                    # Make links clickable
                    st.dataframe(
                        df,
                        column_config={
                            "Link": st.column_config.LinkColumn("Link"),
                            "Snippet": st.column_config.TextColumn("Snippet", width="large"),
                            "Position": st.column_config.NumberColumn("Position", format="%d")
                        },
                        hide_index=True,
                        use_container_width=True,
                        height=600
                    )
                else:
                    st.warning("No results found.")
                
                # Display related searches
                if 'relatedSearches' in results and results['relatedSearches']:
                    st.subheader("Related Searches")
                    related_searches = [item['query'] for item in results['relatedSearches']]
                    st.write(", ".join(related_searches))
                
                # Display API credits used
                if 'credits' in results:
                    st.caption(f"API credits used: {results['credits']}")
                    
            except Exception as e:
                st.error(f"An error occurred: {str(e)}")
    elif not api_key:
        st.warning("Please enter your Serper API key in the sidebar or set the SERPER_API_KEY environment variable.")

if __name__ == "__main__":
    main()
