#  API Models

This directory contains the API models and clients for the LogiTrade application.

## Overview

- `models.py`: Core LLM factory and model instance classes for interacting with various LLM APIs
- `example.py`: Usage examples for the LLM models
- `grok3_client.py`: Client for interacting with the X.AI Grok-3 API for tariff information
- `tariff_api.py`: Flask API for serving tariff data to the frontend

## Grok-3 Tariff Search Implementation

The Grok-3 API integration allows the dashboard to display real-time tariff information for trade routes. This feature helps users make informed decisions by providing up-to-date information on tariffs, duties, and trade agreements.

### Setup Instructions

1. Create a `.env` file in the `/models` directory with your Grok-3 API key:
   ```
   GROK3_API_KEY=xai-your-api-key-here
   ```

2. Install the required dependencies:
   ```bash
   pip install flask flask-cors requests python-dotenv
   ```

3. Run the tariff API server:
   ```bash
   cd models
   python tariff_api.py
   ```

4. In a separate terminal, run the frontend development server:
   ```bash
   cd frontend
   npm run dev
   ```

### API Endpoints

The tariff API provides the following endpoints:

- `GET /api/tariffs`: Fetch tariff information for a specific trade route and item
  - Query parameters:
    - `origin`: Country of origin (required)
    - `destination`: Destination country (required)
    - `item_type`: Type of item being shipped (required)
    - `hs_code`: Harmonized System code (optional)

- `GET /api/hs-code`: Get the Harmonized System code for a specific item description
  - Query parameters:
    - `description`: Detailed description of the item (required)

- `GET /api/mock-tariffs`: Get mock tariff information (for testing without API calls)

### Implementation Details

#### Backend Components

1. **Grok3Client**: A Python client for interfacing with the X.AI Grok-3 API
   - Handles authentication and API requests
   - Processes responses and formats data consistently
   - Provides fallback mechanisms for handling API failures

2. **Flask API Server**: A lightweight server that exposes tariff data to the frontend
   - Serves as a middleware between the frontend and the Grok-3 API
   - Provides error handling and response formatting
   - Includes a mock endpoint for testing without API calls

#### Frontend Components

1. **TariffPanel**: A React component that displays tariff information
   - Shows tariff rates, additional fees, and trade agreements
   - Handles loading states and errors gracefully
   - Provides fallback data when the API is unavailable

2. **Integration with SupplyChainDisruptions**: The tariff panel is integrated into the dashboard
   - Displays real-time tariff data based on the selected route and item type
   - Updates automatically when route or item type changes

### Usage

The tariff information feature is automatically loaded when viewing trade routes on the Supply Chain Disruptions page. The panel shows:

- Current tariff rates
- Additional fees and taxes
- Applicable trade agreements
- Recent policy changes
- Predicted future changes

This data is fetched dynamically from the Grok-3 API, which uses its large language model capabilities to provide the most up-to-date tariff information based on origin, destination, and item type.
