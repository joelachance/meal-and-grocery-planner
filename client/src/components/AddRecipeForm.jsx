import {useState} from 'react'
import {checkSession} from '../api/signupLogin'
import {createRecipe} from '../api/signupLogin'

function AddRecipeForm() {
  const [checkUser, setCheckUser] = useState()
  const [newRecipe, setNewRecipe] = useState({title: "", instructions: "", date:"", user_id: ""})
  const [errors, setErrors] = useState({})
  const [addIngredientStatus, setAddIngredientStatus] = useState(False)
  const [recipeId, setRecipeId] = useState("")

  useEffect(() => {
    checkSession().then(data => setCheckUser(data))
  },[])

  function handleChange(event) {
    const {name, value} = event.target

    setNewRecipe(prev => ({
      ...prev, [name]: value
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()

    //check if user is logged in
    if (!checkUser) {
      alert ('Error connecting to user, cannot create recipe.')
      return
    }

    //add user id to recipe object
    setNewRecipe(prev => ({
      ...prev, ['user_id']: checkUser.id
    }))

    //call POST request
    const result = await createRecipe(newRecipe)
    if (!result.error) {
      alert('Recipe successfully add!')
      setRecipeId(result.id)
    } else {
      alert('Error adding recipe, please try again')
      setErrors(result.error)
    }
  }

  function handleAddIngredient() {
    //render add ingredient forms
    setAddIngredientStatus(True)
  }

  return (
    <div>
      <div className='add-recipe-form-div'>
        <form className='add-recipe-form' onSubmit={handleSubmit}>
          <div>
            <label htmlFor='title'>Title:</label>
            <input id='title' name='title' type='text' value={newRecipe.title} onClick={handleChange}/>
          </div>
          <div>
            <label htmlFor='instructions'>Instructions:</label>
            <textarea id='instructions' name='instructions' type='text' value={newRecipe.instructions} onClick={handleChange}/>
          </div>
          <div>
            <label htmlFor='date'>Date:</label>
            <input id='date' name='date' type='date' value={newRecipe.date} onClick={handleChange}/>
          </div>
          <div>
            <button type='submit'>Add Recipe</button>
          </div>
        </form>
      </div>
      <button onClick={handleAddIngredient}>Add Ingredients</button>
      {addIngredientStatus && <AddIngredientForm recipe_id = {recipeId}/>}
    </div>
  )
}

export default AddRecipeForm