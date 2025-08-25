from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property
from marshmallow import Schema, fields, ValidationError, validate
from app import bcrypt
import re

db = SQLAlchemy()
password_regex = re.compile('^(?=\S{8,20}$)(?=.*?\d)(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[^A-Za-z\s0-9])')

class User(db.Model):
  __tablename__ = 'users'

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String, nullable=False)
  username = db.Column(db.String, unique=True, nullable=False)
  _password_hash = db.Column(db.String, nullable=False)

  recipes = db.relationship('Recipe', back_populates='user')

  @hybrid_property
  def password_hash(self):
    raise AttributeError('Password hashes may not be viewed.')
  
  @password_hash.setter
  def password_hash(self,password):
    password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
    self._password_hash = password_hash.decode('utf-8')

  def authenticate(self,password):
    return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))
  
class UserSchema(Schema):
  id = fields.Integer(dump_only=True)
  name = fields.String(required = True, validate=validate.Length(min=1, max=50, error="name must be between 1 and 50 characters"))
  username = fields.String(required=True)
  password = fields.String(required=True, load_only=True)

  @validates('username')
  def validate_username(self,value, **kwargs):
    if User.query.filter_by(username=value).first():
      raise ValidationError("Username already exists, Please choose a different one")
    
  @validates('password')
  def validate_password(self,value, **kwargs):
    if not password_regex.match(value):
      raise ValidationError("Password must be 8-20 characters long, contain at least one digit, one uppercase letter, one lowercase letter, and one special symbol.")
    
class Recipe(db.Model):
  __tablename__ = 'recipes'

  id = db.Column(db.Integer, primary_key=True)
  title = db.Column(db.String)
  instructions = db.Column
  date = db.Column(db.Date, nullable=False)

  user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
  user = db.relationship('User', back_populates='recipes')
