import {useState} from 'react'

function AddRecipeForm() {
  const [newRecipe, setNewRecipe] = useState({title: "", instructions: "", date:"", user_id: ""})

  function handleChange(event) {
    const {name, value} = event.target

    setNewRecipe(prev => ({
      ...prev, [name]: value
    }))
  }

  function handleSubmit(event) {
    event.preventDefault()

    
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
      <button>Add Ingredients</button>
    </div>
  )
}

export default AddRecipeForm