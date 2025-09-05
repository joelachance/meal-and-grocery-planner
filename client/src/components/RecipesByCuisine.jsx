import {useState, useEffect} from "react"
import { recipesByCuisine } from "../api/spoonacular"

function RecipesByCuisine({cuisine}) {
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

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

  if (loading) {
    return <p>Loading recipes for {cuisine}...</p>
  }
  if (error) {
    return <p>{error}</p>
  }
  if (recipes.length === 0) {
    return <p>No recipes found for {cuisine}</p>
  }

  return (
    <div>
      {recipes.map((recipe) => (
        <div key={recipe.id}>
          <h3>{recipe.title}</h3>
          <button>View Recipe</button>
        </div>
      ))}
    </div>
  )
}

export default RecipesByCuisine