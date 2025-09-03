import '../styles/editRecipeForm.css'
import { useState } from "react"
import EditIngredientsForm from './EditIngredientsForm'
import { updateRecipe } from '../api/recipes'
import {useContext} from "react"
import {UserContext} from '../UserContext'

function EditRecipeForm({setEditStatus, recipe, onClose}) {
  const [editedRecipe, setEditedRecipe] = useState({title: recipe[0].title, instructions: recipe[0].instructions, date: recipe[0].date})
  const [editIngredientsStatus, setEditIngredientsStatus] = useState(false)
  const [editRecipeMessage, setEditRecipeMessage] = useState(null)
  const { user } = useContext(UserContext)

  //form update and submit functions
  async function handleSubmit(event) {
    event.preventDefault()

    if (!user) {
      alert ('Error connecting to user, cannot update recipe.')
      return
    }
    //call PATCH request
    const result = await updateRecipe(recipe[0].id, editedRecipe)
    if (!result.error) {
      setEditRecipeMessage('Recipe successfully updated!')
    } else {
      setEditRecipeMessage('Error updating recipe, please try again.')
    }
  }

  function handleChange(event) {
    const {name, value} = event.target

    setEditedRecipe(prev => ({
      ...prev, [name]:value
    }))
  }


  //edit and back button functions
  function handleBack() {
    setEditStatus(false)
  }

  function handleEditIngredients() {
    setEditIngredientsStatus(true)
  }

  function handleIngredientBack() {
    setEditIngredientsStatus(false)
  }

  return(
    <div>
      {/* display form for editing the recipe */}
      {editIngredientsStatus === false &&
      <div>
        <div className='edit-recipe-form-div'>
          {!editRecipeMessage ?
          <div>
            <h2>Edit your Recipe</h2>
            <form className='edit-recipe-form' onSubmit={handleSubmit}>
              <div>
                <label htmlFor='title'>Title:</label>
                <input id='title' name='title' type='text' value={editedRecipe.title} onChange={handleChange}/>
              </div>
              <div>
                <label htmlFor='instructions'>Instructions:</label>
                <textarea id='instructions' name='instructions' type='text' value={editedRecipe.instructions} onChange={handleChange}/>
              </div>
              <div>
                <label htmlFor='date'>Date:</label>
                <input id='date' name='date' type='date' value={editedRecipe.date} onChange={handleChange}/>
              </div>
              <div>
                <button className='submit-button' type='submit' >Submit</button>
              </div>
              <div>
                <button className='edit-ingredients-button' onChange={handleEditIngredients} >Edit Ingredients</button>
              </div>
            </form> 
            <button className='back-button' onClick={handleBack}>Back</button>
          </div>
          :
          // Once the form is submitted, display the error or success message
            <div>
              <h2>{editedRecipe.title}</h2>
              <p className='success-message'>{editRecipeMessage}</p>
              <div className='edit-recipe-form'>
                <button className='new-edit-ingredients-button' onClick={handleEditIngredients} >Edit Ingredients</button>
              </div>
              <button className='back-button' onClick={onClose}>Done</button>
            </div>
          }
        </div>
      </div>
      // if the user clicks on edit ingredients, display that form replacing the recipe form/submit message
      }
      {editIngredientsStatus === true && 
        <div>
          <h2>Edit Ingredients for {recipe[0].title}</h2>
          <EditIngredientsForm recipe={recipe}/>
          <button className='back-button' onClick={handleIngredientBack}>Back</button>
        </div>
      }
    </div>
  )
}

export default EditRecipeForm