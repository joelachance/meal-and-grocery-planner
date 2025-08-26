# from flask import Flask
# from dotenv import load_dotenv
# import os
# from flask_sqlalchemy import SQLAlchemy
# from flask_bcrypt import Bcrypt
# from flask_jwt_extended import JWTManager
# from flask_restful import Api

# load_dotenv()

# app = Flask(__name__)

# app.config['SQLALCHEMY_DATABASE_URI'] =  os.getenv('DATABASE_URL')
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# app.config["JWT_SECRET_KEY"] = os.getenv('SECRET_KEY')
# app.json.compact = False


# # db.init_app(app)
# bcrypt = Bcrypt()
# jwt = JWTManager()

