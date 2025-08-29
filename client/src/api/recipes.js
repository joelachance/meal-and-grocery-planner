async function createRecipe(content) {
  try {
    const response = await fetch('http://127.0.0.1:5555/api/recipes', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(content)
    })
    const data = await response.json()
    if (!response.ok) {
      return null
    }
    return data
  } catch(error) {
    console.error('Error creating recipe:', error)
    return null
  }
}