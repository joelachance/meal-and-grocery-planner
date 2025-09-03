import '../styles/editRecipeForm.css'
import { useState } from "react"
import EditIngredientsForm from './EditIngredientsForm'

function EditRecipeForm({setEditStatus, recipe}) {
  const [editedRecipe, setEditedRecipe] = useState({title: recipe[0].title, instructions: recipe[0].instructions, date: recipe[0].date})
  const [editIngredientsStatus, setEditIngredientsStatus] = useState(false)

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
      {editIngredientsStatus === false &&
      <div>
        <div className='edit-recipe-form-div'>
          <h2>Edit your Recipe</h2>
          <form className='edit-recipe-form'>
            <div>
              <label htmlFor='title'>Title:</label>
              <input id='title' name='title' type='text' value={editedRecipe.title}/>
            </div>
            <div>
              <label htmlFor='instructions'>Instructions:</label>
              <textarea id='instructions' name='instructions' type='text' value={editedRecipe.instructions}/>
            </div>
            <div>
              <label htmlFor='date'>Date:</label>
              <input id='date' name='date' type='date' value={editedRecipe.date} />
            </div>
            <div>
              <button className='submit-button' type='submit' >Submit</button>
            </div>
            <div>
              <button className='edit-ingredients-button' onClick={handleEditIngredients} >Edit Ingredients</button>
            </div>
          </form>
        </div>
        <button className='back-button' onClick={handleBack}>Back</button>
      </div>
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