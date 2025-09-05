import React from "react"
import NavBar from "../components/NavBar"
import { useState, useEffect } from "react"
import {useContext} from "react"
import {UserContext} from '../UserContext'
import '../styles/grocery.css'

function Grocery() {
  const { user } = useContext(UserContext)

  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    if(user) {
      setRecipes(user.recipes)
    } 
  },[user])

  function handleSubmit(event) {
    event.preventDefault()
  }

  console.log(recipes)
  return(
    <>
      <NavBar />
      <div className='grocery-div'>
        <h2>Generate a Grocery List</h2>
        <form onSubmit={handleSubmit} className='grocery-form'>
          <label htmlFor='start'>Start Date:</label>
          <input type='date' id='start' name='start'/>
          <label htmlFor='end'>End Date:</label>
          <input type='date' id='end' name='end' />
          <button type='submit'>Submit</button>
        </form>
      </div>
    </>
  )
}

export default Grocery