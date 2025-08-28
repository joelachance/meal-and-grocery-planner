function SignupForm({onLogin}) {
  return (
    <div className="signup-form-div">
      <form className='signup-form'>
        <h1>Create an Account</h1>
        <div>
          <label htmlFor='name'>Name:</label>
          <input type='text' id='name'/>
        </div>
        <div>
          <label htmlFor='username'>Username:</label>
          <input type='text' id='username' />
        </div>
        <div>
          <label htmlFor='password'>Password:</label>
          <input type='text' id='password' />
        </div>
        <div>
          <label htmlFor='confirmPassword'>Confirm password:</label>
          <input type='text' id='confirmPassword' />
        </div>
        <div className="signup-button-div">
        <button className="signup-button" type='submit' >Login</button>
        </div>
      </form>
    </div>
  )
}

export default SignupForm