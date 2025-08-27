import React from "react"
import LoginForm from '../components/LoginForm' 
import SignupForm from '../components/SignupForm' 

function Login({onLogin}) {
  const [showLogin, setShowLogin] = useState(true);
  return(
    showLogin ? (
      <>
        <LoginForm onLogin={onLogin}/>
        <p>Dont have an account?
          <Button onClick={() => setShowLogin(false)}>Sign Up</Button>
        </p>
      </>
    ) : (
      <>
        <SignupForm onLogin={onLogin} />
        <p>Already have an account?
          <Button onClick={() => setShowLogin(true)}>Log In</Button>
        </p>
      </>
    )
    ) 
}

export default Login