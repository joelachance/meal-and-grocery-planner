import {addIngredient} from '../api/ingredients'
import {useState} from 'react'

function AddIngredientForm({recipe_id}) {
  const [newIngredient, setNewIngredient] = useState({name: "",quantity: "", quantity_description: "", recipe_id: recipe_id, checked_off: false })
  const [errors, setErrors] = useState({})

  function handleChange(event) {
    const {name,value} = event.target

    setNewIngredient(prev => ({
      ...prev, [name]: name == 'quantity' ? value === "" ? "" : Number(value) : value
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()

    const result = await addIngredient(newIngredient, recipeId)
    if (!result.error) {
      alert('Ingredient(s) successfully added!')
      setNewIngredient({name: "",quantity: "", quantity_description: "", recipe_id: recipeId, checked_off: false })
    } else {
      alert('Error adding ingredient(s), please try again.')
      setErrors(result.error)
    }
  }


  return (
    <div className='add-ingredient-form-div'>
      <form className='add-ingredient-form' onSubmit={handleSubmit}>
        <div>
          <label htmlFor='name'>Name:</label>
          <input id='name' name='name' type='text' value={newIngredient.name} onChange={handleChange}/>
        </div>
        <div>
          <label htmlFor='quantity'>Quantity:</label>
          <input id='quantity' name='quantity' type='number' value={newIngredient.quantity} onChange={handleChange}/>
        </div>
        <div>
          <label htmlFor='quantity_description'>Quantity description (oz, cups, lbs, ect.):</label>
          <input id='quantity_description' name='quantity_description' type='text' value={newIngredient.quantity_description} onChange={handleChange}/>
        </div>
        <div>
          <button type='submit'>Submit</button>
        </div>
      </form>
    </div>
  )
}

export default AddIngredientForm