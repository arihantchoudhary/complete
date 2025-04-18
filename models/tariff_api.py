import os
import json
import datetime
from flask import Flask, request, jsonify
from flask_cors import CORS
from grok3_client import Grok3Client

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Initialize the Grok3 client
grok_client = Grok3Client()

@app.route('/api/tariffs', methods=['GET'])
def get_tariffs():
    """
    API endpoint to get tariff information for a specific trade route and item.
    
    Query parameters:
    - origin: Country of origin (required)
    - destination: Destination country (required)
    - item_type: Type of item being shipped (required)
    - hs_code: Harmonized System code (optional)
    
    Returns:
        JSON object with tariff information
    """
    # Get query parameters
    origin = request.args.get('origin')
    destination = request.args.get('destination')
    item_type = request.args.get('item_type')
    hs_code = request.args.get('hs_code')
    
    # Validate required parameters
    if not all([origin, destination, item_type]):
        return jsonify({
            "error": "Missing required parameters. Please provide origin, destination, and item_type."
        }), 400
    
    # Get tariff information from Grok-3 API
    tariff_data = grok_client.search_tariffs(
        origin_country=origin,
        destination_country=destination,
        item_type=item_type,
        hs_code=hs_code
    )
    
    # Add timestamp if not already present
    if "last_updated" not in tariff_data or not tariff_data["last_updated"]:
        tariff_data["last_updated"] = datetime.datetime.now().strftime("%Y-%m-%d")
    
    return jsonify(tariff_data)

@app.route('/api/hs-code', methods=['GET'])
def get_hs_code():
    """
    API endpoint to get the Harmonized System code for a specific item description.
    
    Query parameters:
    - description: Detailed description of the item (required)
    
    Returns:
        JSON object with the HS code
    """
    # Get query parameters
    description = request.args.get('description')
    
    # Validate required parameters
    if not description:
        return jsonify({
            "error": "Missing required parameter. Please provide item description."
        }), 400
    
    # Get HS code from Grok-3 API
    hs_code = grok_client.get_hs_code(description)
    
    return jsonify({
        "hs_code": hs_code
    })

# For testing purposes
@app.route('/api/mock-tariffs', methods=['GET'])
def get_mock_tariffs():
    """
    API endpoint to get mock tariff information (for testing without API calls).
    """
    mock_data = {
        "tariff_rate": 7.5,
        "additional_fees": [
            {"name": "Import Processing Fee", "rate": 0.3464},
            {"name": "Harbor Maintenance Fee", "rate": 0.125}
        ],
        "trade_agreements": [
            "USMCA (United States-Mexico-Canada Agreement)"
        ],
        "recent_changes": "Tariff rates on specific electronics were adjusted in January 2025 following bilateral negotiations.",
        "future_changes": "Further reductions in tariffs for environmentally friendly electronics are expected by Q3 2025.",
        "last_updated": "2025-04-15"
    }
    
    return jsonify(mock_data)

if __name__ == '__main__':
    # Get port from environment variable or use default
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
