import {addIngredient} from '../api/ingredients'
import {useState} from 'react'

function AddIngredientForm({recipeId}) {
  const [newIngredient, setNewIngredient] = useState({name: "",quantity: "", quantity_description: "", recipe_id: recipeId })

  function handleChange(event) {
    const {name,value} = event.target

    setNewIngredient(prev => ({
      ...prev, [name]: name == 'quantity' ? value === "" ? "" : Number(value) : value
    }))
  }


  return (
    <div className='add-ingredient-form-div'>
      <form className='add-ingredient-form'>
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
      </form>
    </div>
  )
}

export default AddIngredientForm