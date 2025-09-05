import {useState, useEffect} from 'react'
import {createRecipe} from '../api/recipes'
import AddIngredientForm from './AddIngredientForm'
import {useContext} from "react"
import {UserContext} from '../UserContext'
import {useNavigate} from "react-router-dom"
import '../styles/recipeIngredientForms.css'

function AddRecipeForm() {
  const { user, setUser } = useContext(UserContext)
  const [newRecipe, setNewRecipe] = useState({title: "", instructions: "", date:""})
  const [errors, setErrors] = useState({})
  const [recipeId, setRecipeId] = useState("")
  const [ingredientForms, setIngredientForms] = useState([])

  const navigate = useNavigate()

  function handleChange(event) {
    const {name, value} = event.target

    setNewRecipe(prev => ({
      ...prev, [name]: value
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()

    // check if user is logged in
    if (!user) {
      alert ('Error connecting to user, cannot create recipe.')
      return
    }

    //call POST request
    const result = await createRecipe(newRecipe)
    if (!result.error) {
      alert('Recipe successfully added!')
      //store the id in state so it can be passed to the add ingredient form
      setRecipeId(result.id)
      //update state so the new recipe shows up on the calendar
      const addedRecipe = result
      setUser(prev => ({
        ...prev, recipes: [...prev.recipes, addedRecipe]
      }))
    } else {
      alert('Error adding recipe, please try again.')
      setErrors(result.error)
    }
  }

  function handleAddIngredient() {
    //render add ingredient forms
    setIngredientForms([...ingredientForms, {}])
  }

  function handleBackButton() {
    navigate('/recipes')
  }

  return (
    <div>
      <div className='add-recipe-form-div'>
        <h1>Create Your Recipe</h1>
        <form className='add-recipe-form' onSubmit={handleSubmit}>
          <div>
            <label htmlFor='title'>Title:</label>
            <input id='title' name='title' type='text' value={newRecipe.title} onChange={handleChange}/>
          </div>
          <div>
            <label htmlFor='instructions'>Instructions:</label>
            <textarea id='instructions' name='instructions' type='text' value={newRecipe.instructions} onChange={handleChange}/>
          </div>
          <div>
            <label htmlFor='date'>Date:</label>
            <input id='date' name='date' type='date' value={newRecipe.date} onChange={handleChange}/>
          </div>
          <div>
            <button type='submit'>Submit</button>
          </div>
        </form>
      </div>
      <p className='submit-recipe-p'>Please submit your recipe before adding ingredients</p>
      <div className='add-ingredients-button-div'>
        <button onClick={handleAddIngredient} className='add-ingredients-button' >Add Ingredients</button>
      </div>
      {ingredientForms.length > 0 && 
      <div> 
        {ingredientForms.map((_,index) => (
          <div key={index}> 
            <h3 className='ingredient-header'>Ingredient {index + 1}</h3>
            <AddIngredientForm recipe_id={recipeId} />
          </div>
        ))} 
      </div>
      }
      <div className='back-button-div'>
      <button onClick={handleBackButton}>Back to Browse Recipes</button>
      </div>
    </div>
  )
}

export default AddRecipeForm