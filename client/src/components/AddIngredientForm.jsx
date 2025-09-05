import {addIngredient} from '../api/ingredients'
import {useState} from 'react'
import {UserContext} from '../UserContext'
import {useContext} from "react"
import {useNavigate} from "react-router-dom"

function AddIngredientForm({recipe_id}) {
  const { user, setUser } = useContext(UserContext)
  const [newIngredient, setNewIngredient] = useState({name: "",quantity: "", quantity_description: "" })
  const [errors, setErrors] = useState({})

  function handleChange(event) {
    const {name,value} = event.target

    setNewIngredient(prev => ({
      ...prev, [name]: name == 'quantity' ? value === "" ? "" : Number(value) : value
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()

    const result = await addIngredient(newIngredient, recipe_id)
    if (!result.error) {
      alert('Ingredient(s) successfully added!')
      const addedIngredient = result
      setUser(prev => ({
        ...prev, recipes: prev.recipes.map(recipe => recipe.id === recipe_id ?
          {...recipe, ingredients: [...(recipe.ingredients || []), addedIngredient]} : recipe
        )
      }))
    } else {
      alert('Error adding ingredient(s), please try again.')
      setErrors(result.error)
    }
  }


  return (
    <div className='add-ingredient-form-div'>
      <form className='add-ingredient-form' onSubmit={handleSubmit}>
          <label htmlFor='name'>Name:</label>
          <input id='name' name='name' type='text' value={newIngredient.name} onChange={handleChange}/>
          <label htmlFor='quantity'>Quantity:</label>
          <input id='quantity' name='quantity' type='number' value={newIngredient.quantity} onChange={handleChange}/>
          <label htmlFor='quantity_description'>Quantity description (oz, cups, lbs, ect.):</label>
          <input id='quantity_description' name='quantity_description' type='text' value={newIngredient.quantity_description} onChange={handleChange}/>
          <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default AddIngredientForm