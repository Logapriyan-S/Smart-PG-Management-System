
from flask import Flask, request, jsonify, send_from_directory
import json
import os
import mimetypes
import uuid 

# Ensure the browser treats .tsx files as Javascript modules
mimetypes.add_type('application/javascript', '.tsx')
mimetypes.add_type('application/javascript', '.ts')

app = Flask(__name__, static_folder='.', static_url_path='')

DB_PATH = 'database.json'

def load_db():
    if not os.path.exists(DB_PATH):
        initial_data = {
            "residents": [
                {"id": "res-1", "name": "John Doe", "email": "john@example.com", "password": "password", "role": "RESIDENT", "roomNumber": "101", "phoneNumber": "+91 9876543210"},
                {"id": "res-2", "name": "Jane Smith", "email": "jane@example.com", "password": "password", "role": "RESIDENT", "roomNumber": "102", "phoneNumber": "+91 9876543211"}
            ],
            "complaints": [],
            "notices": [
                {"id": "1", "title": "Welcome to Smart PG", "content": "Welcome to our digital management system!", "author": "Admin", "createdAt": "2023-10-01T10:00:00Z"}
            ],
            "menu": {
                "Monday": {"breakfast": {"menu": "Idli, Sambar", "time": "08:00 AM - 09:30 AM"}, "lunch": {"menu": "Rice, Dal", "time": "01:00 PM - 02:30 PM"}, "dinner": {"menu": "Roti, Sabzi", "time": "08:00 PM - 09:30 PM"}},
                "Tuesday": {"breakfast": {"menu": "Poha", "time": "08:00 AM - 09:30 AM"}, "lunch": {"menu": "Rajma Chawal", "time": "01:00 PM - 02:30 PM"}, "dinner": {"menu": "Mixed Veg", "time": "08:00 PM - 09:30 PM"}},
                "Wednesday": {"breakfast": {"menu": "Paratha", "time": "08:00 AM - 09:30 AM"}, "lunch": {"menu": "Pulao", "time": "01:00 PM - 02:30 PM"}, "dinner": {"menu": "Dal Tadka", "time": "08:00 PM - 09:30 PM"}},
                "Thursday": {"breakfast": {"menu": "Toast", "time": "08:00 AM - 09:30 AM"}, "lunch": {"menu": "Kadhi Pakora", "time": "01:00 PM - 02:30 PM"}, "dinner": {"menu": "Chana Masala", "time": "08:00 PM - 09:30 PM"}},
                "Friday": {"breakfast": {"menu": "Upma", "time": "08:00 AM - 09:30 AM"}, "lunch": {"menu": "Sambhar Rice", "time": "01:00 PM - 02:30 PM"}, "dinner": {"menu": "Paneer", "time": "08:00 PM - 09:30 PM"}},
                "Saturday": {"breakfast": {"menu": "Poori Sabzi", "time": "08:00 AM - 10:00 AM"}, "lunch": {"menu": "Chole Bhature", "time": "01:30 PM - 03:00 PM"}, "dinner": {"menu": "Veg Biryani", "time": "08:00 PM - 10:00 PM"}},
                "Sunday": {"breakfast": {"menu": "Pancakes", "time": "08:30 AM - 10:30 AM"}, "lunch": {"menu": "Special Thali", "time": "01:30 PM - 03:30 PM"}, "dinner": {"menu": "Pasta", "time": "08:00 PM - 10:00 PM"}}
            }
        }
        with open(DB_PATH, 'w') as f:
            json.dump(initial_data, f)
    with open(DB_PATH, 'r') as f:
        return json.load(f)

def save_db(data):
    with open(DB_PATH, 'w') as f:
        json.dump(data, f)

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/api/login', methods=['POST'])
def login():
    credentials = request.json
    db = load_db()
    target_role = credentials.get('role') # 'RESIDENT' or 'ADMIN'
    email = credentials.get('email')
    password = credentials.get('password')

    # 1. Handle Owner/Admin Login
    if target_role == 'ADMIN':
        if email == 'admin@pg.com' and password == 'admin123':
            return jsonify({"id": "admin-01", "name": "Administrator", "role": "ADMIN", "email": "admin@pg.com"})
        return jsonify({"error": "Invalid Owner credentials"}), 401

    # 2. Handle Resident Login
    user = next((r for r in db['residents'] if r['email'] == email and r.get('password') == password), None)
    if user:
        if user.get('role') != 'RESIDENT':
            return jsonify({"error": "Account not authorized for resident login"}), 403
        return jsonify(user)

    return jsonify({"error": "Invalid Resident credentials"}), 401

  

@app.route('/api/register', methods=['POST'])
def register():
    data = request.json
    db = load_db()

    # Basic validation
    required_fields = ["name", "email", "password", "roomNumber", "phoneNumber"]
    for field in required_fields:
        if not data.get(field):
            return jsonify({"error": f"{field} is required"}), 400

    # Prevent duplicate email
    if any(r['email'] == data['email'] for r in db['residents']):
        return jsonify({"error": "Email already registered"}), 400

    user = {
        "id": f"res-{uuid.uuid4().hex[:6]}",
        "name": data["name"],
        "email": data["email"],
        "password": data["password"],  # later → hash
        "role": "RESIDENT",
        "roomNumber": data["roomNumber"],
        "phoneNumber": data["phoneNumber"]
    }

    db['residents'].append(user)
    save_db(db)
    return jsonify(user), 201


@app.route('/api/user/<user_id>', methods=['PUT'])
def update_user(user_id):
    updated_data = request.json
    db = load_db()
    for i, res in enumerate(db['residents']):
        if res['id'] == user_id:
            db['residents'][i].update(updated_data)
            save_db(db)
            return jsonify(db['residents'][i])
    return jsonify({"error": "User not found"}), 404

@app.route('/api/menu', methods=['GET', 'POST'])
def handle_menu():
    db = load_db()
    if request.method == 'POST':
        db['menu'] = request.json
        save_db(db)
    return jsonify(db['menu'])

@app.route('/api/complaints', methods=['GET', 'POST'])
def handle_complaints():
    db = load_db()
    if request.method == 'POST':
        db['complaints'].insert(0, request.json)
        save_db(db)
    return jsonify(db['complaints'])

@app.route('/api/notices', methods=['GET', 'POST'])
def handle_notices():
    db = load_db()
    if request.method == 'POST':
        db['notices'].insert(0, request.json)
        save_db(db)
    return jsonify(db['notices'])

@app.route('/api/residents', methods=['GET'])
def get_residents():
    db = load_db()
    return jsonify(db['residents'])

if __name__ == '__main__':
    # Running on 0.0.0.0 allows access from other devices in the network if needed
    app.run(debug=True, host='0.0.0.0', port=5000)

