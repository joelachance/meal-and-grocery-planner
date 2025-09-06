import {useState, useEffect} from "react"
import { recipesByCuisine } from "../api/spoonacular"
import '../styles/recipePage.css'
import RecipeModal from "./RecipeModal"

function RecipesByCuisine({cuisine}) {
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [recipeModal, setRecipeModal] = useState(false)

  useEffect(() => {
    if (!cuisine) return
    async function fetchRecipes() {
      setLoading(true)
      setError(null)
      try {
        const data = await recipesByCuisine(cuisine)
        setRecipes(data)
      } catch (error) {
        setError("Failed to fetch recipes. Please try again later.")
        setRecipes([])
      } finally {
        setLoading(false)
      }
    }
    fetchRecipes()
  },[cuisine])

  function handleViewRecipe() {
    setRecipeModal(true)
  }

  if (loading) {
    return <p className='loading-message'>Loading recipes for {cuisine}...</p>
  }
  if (error) {
    return <p>{error}</p>
  }
  if (recipes.length === 0) {
    return <p className='error-message'>No recipes found for {cuisine}</p>
  }

  return (
    <div className='recipes-by-cuisine-div'>
      {recipes.map((recipe) => (
        <div key={recipe.id} className='recipes-by-cuisine'>
          <h3>{recipe.title}</h3>
          <button onClick={handleViewRecipe}>View Recipe</button>
        </div>
      ))}
      {recipeModal &&
        <RecipeModal />
      }
    </div>
  )
}

export default RecipesByCuisine