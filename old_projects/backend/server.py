import os
from flask import Flask, request, jsonify
from flask_cors import CORS # Import CORS
from werkzeug.utils import secure_filename

# Configure upload folder (optional, adjust as needed)
UPLOAD_FOLDER = 'uploads' 
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app = Flask(__name__)
CORS(app) # Enable CORS for all routes and origins by default
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 10 * 1024 * 1024 # 10 MB limit (matches frontend)

@app.route('/api/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file part in the request"}), 400
    
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
        
    if file:
        # Basic security check for filename
        filename = secure_filename(file.filename) 
        
        # TODO: Add actual processing logic here instead of just saving
        # For now, just save it to the upload folder or print
        # file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        # file.save(file_path) 
        
        print(f"Received file: {filename}") # Log received file
        
        # Return a success response (adjust as needed based on actual processing)
        return jsonify({
            "message": f"File '{filename}' received successfully.",
            "filename": filename 
            # Add any other relevant data from processing
        }), 200
    else:
        return jsonify({"error": "File upload failed"}), 500

if __name__ == '__main__':
    # Run the app (use 0.0.0.0 to make it accessible on the network if needed)
    # Debug=True is helpful for development but should be False in production
    app.run(host='0.0.0.0', port=5001, debug=True)
