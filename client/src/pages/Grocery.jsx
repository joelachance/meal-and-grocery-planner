import React from "react"
import NavBar from "../components/NavBar"
import { useState, useEffect } from "react"
import {useContext} from "react"
import {UserContext} from '../UserContext'
import '../styles/grocery.css'

function Grocery() {
  const { user } = useContext(UserContext)
  const [recipes, setRecipes] = useState([])
  const [dates, setDates] = useState({ start: "", end: "" })
  const [filteredRecipes, setFilteredRecipes] = useState([])
  const [recipeStatus, setRecipeStatus] = useState(true)
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    if(user) {
      setRecipes(user.recipes)
    } 
  },[user])

  function handleChange(event) {
    const {name, value} = event.target
    setDates(prev => ({ 
      ...prev, 
      [name]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    if(!dates.start || !dates.end) {
      setErrorMessage('Error, please input a start and end date')
      return
    }
    setErrorMessage("")
    setRecipeStatus(true)
    const recipeData = recipes.filter((recipe) => {
      return recipe.date >= dates.start && recipe.date <= dates.end
    })
    setFilteredRecipes(recipeData)
    if(recipeData.length === 0) {
      setRecipeStatus(false)
    }
  }

  
  return(
    <>
      <NavBar />
      <div className='grocery-div'>
        <h2>Generate a Grocery List</h2>
        <form onSubmit={handleSubmit} className='grocery-form'>
          <label htmlFor='start'>Start Date:</label>
          <input type='date' id='start' name='start'value={dates.start} onChange={handleChange}/>
          <label htmlFor='end'>End Date:</label>
          <input type='date' id='end' name='end' value={dates.end} onChange={handleChange}/>
          <button type='submit'>Submit</button>
        </form>
        {errorMessage && <p>{errorMessage}</p>}
        {recipeStatus === false && !errorMessage ?
          <p>No recipes found for these dates</p> :
          <div> </div>
        }
      </div>
    </>
  )
}

export default Grocery