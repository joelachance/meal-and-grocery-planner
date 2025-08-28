import React from "react"
import { useState } from "react";
import LoginForm from '../components/LoginForm' 
import SignupForm from '../components/SignupForm' 

function Login({onLogin}) {
  const [showLogin, setShowLogin] = useState(true);
  return(
    showLogin ? (
      <>
        <LoginForm onLogin={onLogin}/>
        <p>Dont have an account?
          <button onClick={() => setShowLogin(false)}>Sign Up</button>
        </p>
      </>
    ) : (
      <>
        <SignupForm onLogin={onLogin} />
        <p>Already have an account?
          <button onClick={() => setShowLogin(true)}>Log In</button>
        </p>
      </>
    )
    ) 
}

export default Login