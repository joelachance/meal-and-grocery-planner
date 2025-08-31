import {useState, useEffect} from 'react'
import {checkSession} from '../api/signupLogin'
import {createRecipe} from '../api/recipes'
import AddIngredientForm from './AddIngredientForm'
import {useContext} from "react"
import {UserContext} from '../UserContext'

function AddRecipeForm() {
  const { user } = useContext(UserContext)
  const [newRecipe, setNewRecipe] = useState({title: "", instructions: "", date:""})
  const [errors, setErrors] = useState({})
  const [recipeId, setRecipeId] = useState("")
  const [ingredientForms, setIngredientForms] = useState([])

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

    console.log('new recipe:', newRecipe)
   

    //call POST request
    const result = await createRecipe(newRecipe)
    console.log("result:", result)
    if (!result.error) {
      alert('Recipe successfully added!')
      setRecipeId(result.id)
      console.log("recipe id:",result.id)
      setNewRecipe({title: "", instructions: "", date:"", user_id: ""})
    } else {
      alert('Error adding recipe, please try again.')
      setErrors(result.error)
    }
  }

  function handleAddIngredient() {
    //render add ingredient forms
    setIngredientForms([...ingredientForms, {}])
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
      <button onClick={handleAddIngredient}>Add Ingredients</button>
      {ingredientForms.length > 0 && 
      <div> 
        {ingredientForms.map((_,index) => (
          <AddIngredientForm key={index} recipe_id={recipeId} />
        ))} 
      </div>
      }
    </div>
  )
}

export default AddRecipeForm