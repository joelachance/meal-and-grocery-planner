from config import app, db, api, jwt, bcrypt
from flask_migrate import Migrate
from flask import request, session, jsonify, make_response
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
from flask_jwt_extended import create_access_token, get_jwt_identity, verify_jwt_in_request
from models import User, UserSchema, Recipe, RecipeSchema, Ingredient, IngredientSchema, RecipeNote, RecipeNoteSchema

db.init_app(app)
bcrypt.init_app(app)
jwt.init_app(app)
api.init_app(app)
migrate = Migrate(app, db)

@app.before_request
def check_if_logged_in():
  open_access_list = ['signup','login']
  if (request.endpoint) not in open_access_list and (not verify_jwt_in_request()):
      return {'error': ['401 Unauthorized']}, 401

@app.after_request
def add_headers(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.add('Access-Control-Allow-Methods', "GET, POST, PATCH, DELETE")
    return response

class Signup(Resource):
  def post(self):
    pass
   
class Login(Resource):
  def post(self):
    pass

class Logout(Resource):
  def delete(self):
    pass
   
class Recipes(Resource):
  #get all recipes for a user
  def get(self):
    pass

  #create a recipe
  def post(self):
    pass

class Recipe(Resource):
  #get one recipe for a user
  def get(self,id):
    pass
  
  #edit a recipe
  def patch(self,id):
    pass

  #delete a recipe
  def delete(self,id):
    pass

class RecipeIngredients(Resource):
  #create an ingredient and add to a recipe
  def post(self,recipe_id):
    pass

class RecipeIngredient(Resource): 
  #edit an ingredient
  def patch(self,recipe_id,id):
    pass

  #delete an ingredient
  def delete(self,recipe_id,id):
    pass

class RecipeNotes(Resource):
  #create a note and add to a recipe
  def post(self,recipe_id):
    pass

class RecipeNote(Resource):
  #edit a note
  def patch(self,recipe_id,id):
    pass

  #delete a note
  def delete(self,recipe_id,id):
    pass

api.add_resource(Signup, '/signup')
api.add_resource(Login, '/login')
api.add_resource(Logout, '/logout')
api.add_resource(Recipes, '/api/recipes')
api.add_resource(Recipe, '/api/recipes/<int:recipe_id>')
api.add_resource(RecipeIngredients, '/api/recipes/<int:recipe_id>/ingredients')
api.add_resource(RecipeIngredient, '/api/recipes/<int:recipe_id>/ingredients/<int:id>')
api.add_resource(RecipeNotes, '/api/recipes/<int:recipe_id>/notes')
api.add_resource(RecipeNotes, '/api/recipes/<int:recipe_id>/notes/<int:id>')