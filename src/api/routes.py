"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, unset_jwt_cookies
from werkzeug.security import generate_password_hash, check_password_hash

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"message": "Email and Password are required."}), 400
    
    user = User.query.filter_by(email=email).first()
    if user:
        return jsonify({"message": "User already exist!"}), 400
    
    new_user = User(
        email = email,
        password = generate_password_hash(password),
        is_active = True
    )
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "You are now a Force User."}), 201

@api.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data:
        return jsonify({"message": "Missing JSON in request"}), 400
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"message": "Email and Password are required."}), 400
    
    user = User.query.filter_by(email = email).first()
    if not user or not check_password_hash(user.password, password):
        return jsonify({"message": "Wrong credentials"}), 401
    
    access_token = create_access_token(identity = str(user.id))
   
    return jsonify({
       "message": "Access Granted",
       "access_token": access_token,
       "user_id": user.id
   }), 200

@api.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    response = jsonify({"message": "Logged out."})
    unset_jwt_cookies(response)
    return response, 200

@api.route('/private', methods = ['GET'])
@jwt_required()
def private():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    return jsonify({"message": f"Hello, {user.email} (ID: {user.id})"}), 200