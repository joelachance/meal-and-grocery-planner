#!/usr/bin/env python3

from app import app, db
from server.models import User, Recipe, Ingredient, RecipeNote
from datetime import date 

with app.app_context():
  RecipeNote.query.delete()
  Ingredient.query.delete()
  Recipe.query.delete()
  User.query.delete()

  #create a user for testing purposes
  u1 = User(name='Marcus', username='flipz')
  u1.password = 'ilovePapaya'

  db.session.add(u1)
  db.session.commit()

  #create recipes for the user
  r1 = Recipe(
    user=u1, 
    title='Classic Pancakes',
    instructions='Mix flour, milk, eggs, sugar, butter and baking powder. Pour batter onto a hot pan, cook until golden on both sides, and serve with syrup.',
    date=date(2025,8,26)
    )
  
  r2 = Recipe(
    user=u1,
    title='Caprese Salad',
    instructions = 'Slice tomatoes and mozzarella. Layer with basil leaves, drizzle with olive oil and balsamic vinegar, and season with salt and pepper.',
    date = date(2025,8,27)
  )

  r3 = Recipe(
    user=u1,
    title='Chicken Stir Fry',
    instructions='Cook chicken pieces until browned. Stir fry vegetables, add chicken, season with soy sauce and sesame oil, and serve over rice.',
    date=date(2025,9,1)
  )

  r4 = Recipe(
    user=u1,
    title='Spaghetti',
    instructions='Cook spaghetti. Sauté garlic in olive oil, add chili flakes, toss spaghetti with the mixture, and serve with parsley.',
    date=date(2025,8,29)
  )

  db.session.add_all([r1,r2,r3,r4])
  db.session.commit()

  #create ingredients for recipes
  #pancakes
  i1 = Ingredient(recipe=r1, name='flour', quantity=1.5, quantity_description='cups', checked_off=False)
  i2 = Ingredient(recipe=r1, name='milk', quantity=1.25, quantity_description="cups", checked_off=False)
  i3 = Ingredient(recipe=r1, name='eggs', quantity=1, quantity_description="egg", checked_off=False)
  i4 = Ingredient(recipe=r1, name='baking powder', quantity=1, quantity_description="tablespoon", checked_off=False)
  i5 = Ingredient(recipe=r1, name='sugar', quantity=1, quantity_description="tablespoon", checked_off=False)
  i6 = Ingredient(recipe=r1, name='butter', quantity=5, quantity_description="tablespoons", checked_off=False)
  #caprese salad
  i7 = Ingredient(recipe=r2, name='tomato', quantity=3, quantity_description='tomatoes', checked_off=False)
  i8 = Ingredient(recipe=r2, name='mozzarella', quantity=3 , quantity_description='balls', checked_off=False)
  i9 = Ingredient(recipe=r2, name='basil', quantity=10, quantity_description='leaves', checked_off=False)
  i10 = Ingredient(recipe=r2, name='olive oil', quantity=2, quantity_description='tablespoons', checked_off=False)
  i11 = Ingredient(recipe=r2, name='balsamic vinegar', quantity=3 , quantity_description='tablespoons', checked_off=False)
  #chicken stir fry
  i12 = Ingredient(recipe=r3, name='chicken', quantity=2, quantity_description='breasts', checked_off=False)
  i13 = Ingredient(recipe=r3, name='broccoli', quantity=1, quantity_description='cup', checked_off=False)
  i14 = Ingredient(recipe=r3, name='bell pepper', quantity=1, quantity_description='cup', checked_off=False)
  i15 = Ingredient(recipe=r3, name='zucchini', quantity=1, quantity_description='cup', checked_off=False)
  i16 = Ingredient(recipe=r3, name='soy sauce', quantity=2, quantity_description='tablespoons', checked_off=False)
  i17 = Ingredient(recipe=r3, name='sesame oil', quantity=3, quantity_description='tablespoons', checked_off=False)
  i18 = Ingredient(recipe=r3, name='rice', quantity=2, quantity_description='cups', checked_off=False)
  #spaghetti
  i19 = Ingredient(recipe=r4, name='spaghetti', quantity=16, quantity_description='oz', checked_off=False)
  i20 = Ingredient(recipe=r4, name='olive oil', quantity=4, quantity_description='tablespoons', checked_off=False)
  i21 = Ingredient(recipe=r4, name='chili flakes', quantity=2, quantity_description='tablespoons', checked_off=False)
  i22 = Ingredient(recipe=r4, name='garlic', quantity=6, quantity_description='cloves', checked_off=False)
  i23 = Ingredient(recipe=r4, name='parsley', quantity=3, quantity_description='tablespoons', checked_off=False)

  db.session.add_all([i1,i2,i3,i4,i5,i6,i7,i8,i9,i10,i11,i12,i13,i14,i15,i16,i17,i18,i19,i20,i21,i22,i23])
  db.session.commit()

  #create notes for a recipe
  n1 = RecipeNote(recipe=r1, note='butter pan well before cooking', date=date(2025,8,26))
  n2 = RecipeNote(recipe=r2, note='eat right after making, doesnt keep well', date=date(2025,8,27))
  n3 = RecipeNote(recipe=r3, note='next time try with teriyaki sauce', date=date(2025,9,1))
  n4 = RecipeNote(recipe=r3, note='delicious with teriyaki sauce instead of soy sauce', date=date(2025,9,1))
  n5 = RecipeNote(recipe=r4, note='simple but tasty, maybe add shrimp?', date=date(2025,8,29))

  db.session.add_all([n1,n2,n3,n4,n5])
  db.session.commit()