from config import app, db, jwt, bcrypt
from flask_migrate import Migrate
from flask import request, session, jsonify, make_response
import requests
from flask_restful import Resource, Api
from sqlalchemy.exc import IntegrityError
from flask_jwt_extended import create_access_token, get_jwt_identity, verify_jwt_in_request, exceptions
from dotenv import load_dotenv
import os
from models import User, UserSchema, Recipe, RecipeSchema, Ingredient, IngredientSchema, RecipeNote, RecipeNoteSchema

db.init_app(app)
bcrypt.init_app(app)
jwt.init_app(app)
migrate = Migrate(app, db)
api = Api(app)
api_key = os.getenv('SPOONACULAR_API_KEY')

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

class RecipesByCuisine(Resource):
  def get(self,cuisine):
    url = 'https://api.spoonacular.com/recipes/complexSearch'
    params={
      "cuisine": cuisine,
      "number": 50,
      "apiKey": api_key
    }
    response = requests.get(url, params=params)
    return response.json(), response.status_code
  
class RecipeInformation(Resource):
  def get(self,recipe_id):
    url = f'https://api.spoonacular.com/recipes/{recipe_id}/information'
    params = {"apiKey": api_key}
    response = requests.get(url, params=params)
    return response.json(), response.status_code

api.add_resource(Signup, '/signup', endpoint='signup')
api.add_resource(Login, '/login', endpoint='login')
api.add_resource(Logout, '/logout', endpoint='logout')
api.add_resource(Recipes, '/api/recipes', endpoint='recipes')
api.add_resource(Recipe, '/api/recipes/<int:recipe_id>', endpoint='recipe')
api.add_resource(RecipeIngredients, '/api/recipes/<int:recipe_id>/ingredients', endpoint='ingredients')
api.add_resource(RecipeIngredient, '/api/recipes/<int:recipe_id>/ingredients/<int:id>', endpoint='ingredient')
api.add_resource(RecipeNotes, '/api/recipes/<int:recipe_id>/notes', endpoint='notes')
api.add_resource(RecipeNote, '/api/recipes/<int:recipe_id>/notes/<int:id>', endpoint='note')
api.add_resource(RecipesByCuisine, '/recipes/cuisine/<string:cuisine>', endpoint='recipesbycuisine')
api.add_resource(RecipeInformation, '/recipes/information/<int:recipe_id>', endpoint='recipeinformation')


if __name__ == '__main__':
  app.run(port=5555, debug=True)