import '../styles/editRecipeForm.css'
import { useState } from "react"

function EditRecipeForm({setEditStatus, recipe}) {
  const [editedRecipe, setEditedRecipe] = useState({title: recipe[0].title, instructions: recipe[0].instructions, date: recipe[0].date})

  console.log(recipe)

  function handleBack() {
    setEditStatus(false)
  }

  return(
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
            <button className='edit-ingredients-button' >Edit Ingredients</button>
          </div>
        </form>
      </div>
      <button className='back-button' onClick={handleBack}>Back</button>
    </div>
  )
}

export default EditRecipeForm