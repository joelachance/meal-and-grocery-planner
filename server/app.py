# from config import app, jwt, bcrypt

from flask_migrate import Migrate
from flask import request, session, jsonify, make_response
import requests
from flask_restful import Resource, Api
from sqlalchemy.exc import IntegrityError
from extensions import db
from flask_jwt_extended import create_access_token, get_jwt_identity, verify_jwt_in_request, jwt_required, exceptions
from dotenv import load_dotenv
import os
from flask import Flask
from dotenv import load_dotenv
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_restful import Api
from server.models import User, UserSchema, Recipe, RecipeSchema, Ingredient, IngredientSchema, RecipeNote, RecipeNoteSchema


load_dotenv()

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] =  os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config["JWT_SECRET_KEY"] = os.getenv('SECRET_KEY')
app.json.compact = False

db.init_app(app)

# bcrypt.init_app(app)
# jwt.init_app(app)
migrate = Migrate(app, db)
api = Api(app)
api_key = os.getenv('SPOONACULAR_API_KEY')
bcrypt = Bcrypt(app)
jwt = JWTManager(app)




@app.after_request
def add_headers(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.add('Access-Control-Allow-Methods', "GET, POST, PATCH, DELETE")
    return response

class Signup(Resource):
  def post(self):
    signup_data = request.get_json()
    username = signup_data.get('username')
    name = signup_data.get('name')
    password = signup_data.get('password')

    user = User(username = username, name = name)
    user.password_hash = password
    try:
      db.session.add(user)
      db.session.commit()
      #create a JSON Web Token
      access_token = create_access_token(identity=str(user.id))
      return make_response(jsonify(token = access_token, user = UserSchema().dump(user)), 200)
    except IntegrityError:
      return {'error': 'unable to complete signup'}, 422

   
class Login(Resource):
  def post(self):
    login_data = request.get_json()
    username = login_data.get('username')
    password = login_data.get('password')

    user = User.query.filter(User.username == username).first()

    if user and user.authenticate(password):
      access_token = create_access_token(identity=str(user.id))
      return make_response(jsonify(token = access_token, user = UserSchema().dump(user)),200)
    return {'error': 'incorrect username or password'}, 401

#handle logout on the frontend
   
class Recipes(Resource):
  @jwt_required()
  def get(self):
    user_id = get_jwt_identity()
    recipes = Recipe.query.filter(Recipe.user_id == user_id).all()
    return RecipeSchema(many=True).dump(recipes), 200

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
# api.add_resource(Logout, '/logout', endpoint='logout')
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