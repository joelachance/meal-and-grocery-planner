from config import app, db, api, jwt, bcrypt
from flask_migrate import Migrate
from models import User, UserSchema, Recipe, RecipeSchema, Ingredient, IngredientSchema, RecipeNote, RecipeNoteSchema

db.init_app(app)
bcrypt.init_app(app)
jwt.init_app(app)
api.init_app(app)
migrate = Migrate(app, db)