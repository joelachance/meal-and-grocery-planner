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