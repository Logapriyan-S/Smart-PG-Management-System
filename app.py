from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import json
import os
import uuid 
from datetime import datetime
from dotenv import load_dotenv

# Load environment variables for local development
load_dotenv()

# Point static_folder to 'dist' where Vite builds your React files
app = Flask(__name__, static_folder='dist', static_url_path='')
CORS(app) 

# Define database path
DB_PATH = 'database.json'

# --- DATABASE HELPERS ---
def load_db():
    if not os.path.exists(DB_PATH):
        # Create a fresh database if it doesn't exist on the server
        initial_data = {"residents": [], "complaints": [], "notices": [], "menu": {}}
        save_db(initial_data)
        return initial_data
    try:
        with open(DB_PATH, 'r') as f:
            content = f.read().strip()
            if not content:
                return {"residents": [], "complaints": [], "notices": [], "menu": {}}
            return json.loads(content)
    except Exception as e:
        print(f"Database Error: {e}")
        return {"residents": [], "complaints": [], "notices": [], "menu": {}}

def save_db(data):
    with open(DB_PATH, 'w') as f:
        json.dump(data, f, indent=4)

# --- API ROUTES ---

@app.route('/api/login', methods=['POST'])
def login():
    credentials = request.json
    db = load_db()
    email = credentials.get('email')
    password = credentials.get('password')
    target_role = credentials.get('role')
    user = next((r for r in db['residents'] if r['email'] == email and r.get('password') == password), None)
    if user:
        if user.get('role') != target_role:
            return jsonify({"error": f"Unauthorized for {target_role.lower()} access"}), 403
        return jsonify(user)
    return jsonify({"error": "Invalid credentials"}), 401

@app.route('/api/residents', methods=['GET', 'POST'])
def handle_residents():
    db = load_db()
    if request.method == 'POST':
        data = request.json
        new_resident = {
            "id": f"res-{uuid.uuid4().hex[:6]}",
            "name": data.get("name"),
            "email": data.get("email"),
            "password": data.get("password"),
            "role": "RESIDENT",
            "roomNumber": data.get("roomNumber"),
            "roomType": data.get("roomType", "Single"),
            "phoneNumber": data.get("phoneNumber", ""),
            "isRentPaid": False,
            "paidMonths": []
        }
        db['residents'].append(new_resident)
        save_db(db)
        return jsonify(new_resident), 201
    return jsonify(db['residents'])

@app.route('/api/user/<user_id>', methods=['PUT', 'DELETE'])
def update_user(user_id):
    db = load_db()
    if request.method == 'DELETE':
        db['residents'] = [r for r in db['residents'] if r['id'] != user_id]
        save_db(db)
        return jsonify({"message": "Deleted"}), 200
    updated_data = request.json
    for i, res in enumerate(db['residents']):
        if res['id'] == user_id:
            db['residents'][i].update(updated_data)
            save_db(db)
            return jsonify(db['residents'][i])
    return jsonify({"error": "Not found"}), 404

@app.route('/api/notices', methods=['GET', 'POST'])
def handle_notices():
    db = load_db()
    if request.method == 'POST':
        data = request.json
        new_notice = {
            "id": data.get("id", f"not-{uuid.uuid4().hex[:6]}"),
            "title": data.get("title"),
            "content": data.get("content"),
            "author": data.get("author"),
            "createdAt": data.get("createdAt", datetime.now().isoformat())
        }
        db['notices'].insert(0, new_notice)
        save_db(db)
        return jsonify(new_notice), 201
    return jsonify(db.get('notices', []))

@app.route('/api/notices/<notice_id>', methods=['DELETE'])
def delete_notice(notice_id):
    db = load_db()
    db['notices'] = [n for n in db.get('notices', []) if n['id'] != notice_id]
    save_db(db)
    return jsonify({"success": True}), 200

@app.route('/api/complaints', methods=['GET', 'POST'])
def handle_complaints():
    db = load_db()
    if request.method == 'POST':
        data = request.json
        db['complaints'].insert(0, data)
        save_db(db)
        return jsonify(data), 201
    return jsonify(db.get('complaints', []))

@app.route('/api/complaints/<complaint_id>', methods=['PUT'])
def update_complaint(complaint_id):
    db = load_db()
    updated_data = request.json
    for c in db.get('complaints', []):
        if c['id'] == complaint_id:
            c['status'] = updated_data.get('status', c['status'])
            save_db(db)
            return jsonify(c), 200
    return jsonify({"error": "Complaint not found"}), 404

@app.route('/api/menu', methods=['GET', 'POST'])
def handle_menu():
    db = load_db()
    if request.method == 'POST':
        db['menu'] = request.json
        save_db(db)
        return jsonify(db['menu']), 200
    return jsonify(db.get('menu', {}))

# --- OPTION 1: SERVE REACT SPA ---
# This serves the React build for the home page and ensures 
# client-side routing works by sending unknowns back to index.html
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    # Check if the requested path exists as a physical file in 'dist'
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        # Otherwise, let React handle it
        return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    # Render assigns a dynamic PORT environment variable
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
