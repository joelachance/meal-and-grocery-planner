import React from "react"
import { useState } from "react"
import { login } from "../api/signupLogin"
import { useNavigate } from 'react-router-dom'

function LoginForm({onLogin}) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState([])
  const navigate = useNavigate()
  
  async function handleSubmit(event) {
    event.preventDefault()
    const loginData = await login(username, password)
    if(!loginData.error) {
      onLogin(loginData.token, loginData.user)
      navigate('/')
    } else {
      setErrors(loginData.error)
      console.log(loginData.error)
    }
  }
  return (
    <div className='login-form-div'>
      <h1>Plate & Pantry</h1>
      <form className='login-form' onSubmit={handleSubmit}>
        <div>
          <label htmlFor='username'>Username:</label>
          <input type='text' id='username' value={username} onChange={(e) => setUsername(e.target.value)}/>
        </div>
        <div>
          <label htmlFor='password'>Password:</label>
          <input type='text' id='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <div className="login-button-div">
        <button className="login-button" type='submit' >Login</button>
        </div>
      </form>
      {errors && <p>{errors[0]}</p>}
    </div>
  )
}

export default LoginForm