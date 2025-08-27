export async function signup(username, password, passwordConfirmation) {
  try {
    const response = await fetch('http://127.0.0.1:5555/signup', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({username,password, password_confirmation: passwordConfirmation})
    })
    const data = await response.json()
    localStorage.setItem("token", data.token)
    return data
  } catch (error) {
    console.error("Error completing signup:", error)
    return null
  }
}
