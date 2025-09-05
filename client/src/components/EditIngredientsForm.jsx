import { useState, useEffect } from "react"
import "../styles/editIngredients.css"
import { deleteIngredient, editIngredient } from "../api/ingredients"
import {useContext} from "react"
import {UserContext} from '../UserContext'

function EditIngredientsForm({recipe}) {
  const { user, setUser } = useContext(UserContext)
  const recipeId = recipe[0].id
  const currentRecipe = user.recipes.find(r => r.id === recipeId)
  // const [recipeIngredientData, setRecipeIngredientData] = useState(recipe[0].ingredients)
  const [editedIngredients, setEditedIngredients] = useState(currentRecipe.ingredients)

  // useEffect(() => {
  //   setEditedIngredients(recipe[0].ingredients)
  // }, [currentRecipe])


  if (editedIngredients.length === 0) {
    return <div>
        <p>Recipe has no ingredients</p>
        <button>Add Ingredients</button>
      </div>
  }

  function handleIngredientChange(index, event) {
    const {name,value} = event.target
    setEditedIngredients(prev => {
      const updated = [...prev]
      let newValue = value
      if(name==='quantity') {
        if(value == "") {
          newValue = ""
        } else {
          newValue = parseInt(value,10)
        }
      } 
      updated[index] = {...updated[index], [name]: newValue}
      return updated
    })
  }

  async function handleSubmit(index, event) {
    event.preventDefault()
    const recipeId = recipe[0].id
    const ingredientId = editedIngredients[index].id
    const content = editedIngredients[index]
    const {checked_off, id, ...rest} = content
    const result = await editIngredient(recipeId, ingredientId, rest)
    if (!result.error) {
      alert('Ingredient successfully updated')
      //find the recipe then find the ingredient and update it 
      //allows the user to see the change immediately
      setUser(prev => ({
        ...prev,
        recipes: prev.recipes.map(r => 
          r.id === recipeId ? 
            {...r, ingredients: r.ingredients.map(ing => 
              ing.id === ingredientId ? {...ing, ...rest} : ing)} :r)
      }))
    } else {
      alert('Error updating ingredient, please try again.')
    }
  }

  async function handleDelete(index, event) {
    const ingredientId = editedIngredients[index].id
    const recipeId = recipe[0].id
    const result = await deleteIngredient(recipeId,ingredientId)
    if (!result.error) {
      alert('Ingredient successfully deleted!')
      //remove the ingredient from user state
      setUser(prev => ({
        ...prev,
        recipes: prev.recipes.map(r => 
          r.id === recipeId ? 
            {...r, ingredients: r.ingredients.filter(ing => 
            ing.id !== ingredientId)} : r
        )
      }))

      //remove the ingredient from local state so the form updates
      // setRecipeIngredientData(prev => prev.filter((_, i) => i !== index))
      setEditedIngredients(prev => prev.filter((_, i) => i !== index))
    } else {
      alert('Error deleting ingredient, please try again.')
    }
  }

  
  return (
    <div className='ingredients-div'>
      <h2>Edit Ingredients for {recipe[0].title}</h2>
      {editedIngredients.map((ingredient, index) => (
        <div key={ingredient.id} className='ingredient-form-div'>
          <form className='ingredient-form' onSubmit={(event) => handleSubmit(index,event)}>
            <label htmlFor='name' >Name:</label>
            <input type='text' id='name' name='name' value={editedIngredients[index].name}  onChange={(event) => handleIngredientChange(index,event)}/>
            <label htmlFor='quantity'>Quantity:</label>
            <input type='number' id='quantity' name='quantity' value={editedIngredients[index].quantity}  onChange={(event) => handleIngredientChange(index,event)}/>
            <label htmlFor='quantity_description'>Qantity Description:</label>
            <input type='text' id='quantity_description' name='quantity_description' value={editedIngredients[index].quantity_description}  onChange={(event) => handleIngredientChange(index,event)}/>
            <button type='submit' className='ingredient-submit-button'>Submit</button>
            <button className='delete-ingredient-button' type="button" onClick={(event) => handleDelete(index,event)}>Delete Ingredient</button>
          </form>
        </div>
      ))}
    </div>
  )
}

export default EditIngredientsForm

