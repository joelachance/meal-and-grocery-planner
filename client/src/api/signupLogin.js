export async function signup(username, password, passwordConfirmation) {
  try {
    const response = await fetch('/signup', {
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

export async function login(username, password) {
  try {
    const response = await fetch('/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({username, password})
    })
    const data = await response.json()
    if(!response.ok) {
      return { error: data.error || ["Login failed"] }
    }
    localStorage.setItem("token", data.token)
    return data
  } catch (error) {
    console.error("Error logging in:", error)
    return { error: ["Network error"] }
  }
}

export async function checkSession() {
  try {
    const response = await fetch('/me', {
      headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    const data = await response.json()
    if(!response.ok) {
      return null
    }
    return data
  } catch (error) {
    console.error("Error, user is not logged in:", error)
    return null
  }
}