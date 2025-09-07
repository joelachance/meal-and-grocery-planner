export async function recipesByCuisine(cuisine) {
  try {
    const response = await fetch(`http://127.0.0.1:5555/recipes/cuisine/${cuisine}`)
    const data = await response.json()
    if (!response.ok) {
      return []
    }
    return data.results
  } catch (error) {
    console.error ("Error fetching recipes:", error)
    return []
  }
}

export async function recipeInformation(recipe_id) {
  try {
    const response = await fetch(`http://127.0.0.1:5555/recipes/information/${recipe_id}`)
    const data = await response.json()
    if (!response.ok) {
      return null
    }
    return data
  } catch(error) {
    console.error ("Error fetching recipe:", error)
    return null
  }
}