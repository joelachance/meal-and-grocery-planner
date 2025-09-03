import { useState } from "react"
import "../styles/editIngredients.css"

function EditIngredientsForm({recipe}) {
  const [recipeIngredientData, setRecipeIngredientData] = useState(recipe[0].ingredients)
  const [editedIngredients, setEditedIngredients] = useState(recipeIngredientData || [])

  function handleIngredientChange(index, event) {
    const {name,value} = event.target

    setEditedIngredients(prev => {
      const updated = [...prev]
      let newValue = value
      if(name==='quantity') {
        if(value == "") {
          newValue = ""
        } else {
          newValue = parseInt(value,10)
        }
      } 
      updated[index] = {...updated[index], [name]: newValue}
      return updated
    })
  }

  return (
    <div className='ingredients-div'>
      {recipeIngredientData.map((ingredient, index) => (
        <div key={ingredient.id} className='ingredient-form-div'>
          <form className='ingredient-form'>
            <label htmlFor='name' >Name:</label>
            <input type='text' id='name' name='name' value={editedIngredients[index].name}  onChange={(event) => handleIngredientChange(index,event)}/>
            <label htmlFor='quantity'>Quantity:</label>
            <input type='number' id='quantity' name='quantity' value={editedIngredients[index].quantity}  onChange={(event) => handleIngredientChange(index,event)}/>
            <label htmlFor='quantity_description'>Qantity Description:</label>
            <input type='text' id='quantity_description' name='quantity_description' value={editedIngredients[index].quantity_description}  onChange={(event) => handleIngredientChange(index,event)}/>
            <button type='submit' className='ingredient-submit-button'>Submit</button>
            <button className='delete-ingredient-button'>Delete Ingredient</button>
          </form>
        </div>
      ))}
    </div>
  )
}

export default EditIngredientsForm

