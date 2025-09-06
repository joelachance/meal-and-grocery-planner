import { recipeInformation } from "../api/spoonacular"
import {useState, useEffect} from "react"
import '../styles/recipeModal.css'

function RecipeModal({recipe, onClose}) {
  const [recipeData, setRecipeData] = useState()
  const [error, setError] = useState()
  const [ingredients, setIngredients] = useState([])
  const [instructions, setInstructions] = useState([])

  useEffect(() => {
    async function fetchRecipe() {
      try {
        const data = await recipeInformation(recipe.id)
        setError("")
        setRecipeData(data)
        const ingredientArray = []
        data.extendedIngredients.map((ingredient) => {
          const string = `${ingredient.name} (${ingredient.amount} ${ingredient.unit})`
          ingredientArray.push(string)
        })
        setIngredients(ingredientArray)
        const instructionsArray = []
        data.analyzedInstructions.map((instruction) => {
          instruction.steps.map((step)=> {
            const string = `${step.step}`
            instructionsArray.push(string)
          })
        })
        setInstructions(instructionsArray)
      } catch {
        setError('Error loading recipe')
        setRecipeData(null)
      }
    }
    fetchRecipe()
  },[recipe])
  console.log(recipeData)
  return (
    <div className='recipe-modal'>
      <button className='x-button' onClick={onClose}>X</button>
      {recipeData && !error &&
      <div>
        <h3>{recipeData.title}</h3>
        <p>Ingredients: {ingredients.join(', ')}</p>
        <p>Instructions: {instructions.join(' ')}</p>
      </div>
      }
      <button className='save-button'>Save Recipe</button>

    </div>
  )
}

export default RecipeModal