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
  const [recipeStatus, setRecipeStatus] = useState(false)
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
    
    const recipeData = recipes.filter((recipe) => {
      return recipe.date >= dates.start && recipe.date <= dates.end
    })

    setFilteredRecipes(recipeData)

    if(recipeData.length === 0) {
      setRecipeStatus(false)
    } else {
      setRecipeStatus(true)
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
        {!errorMessage && recipeStatus && filteredRecipes.length === 0 ?
          <p>No recipes found for these dates</p> : ""
        }
        {recipeStatus === true && !errorMessage && filteredRecipes.length > 0 ?
          <div> 
            <h3>Grocery list for {dates.start} - {dates.end}</h3>
            <ul>
              {filteredRecipes.map((recipe) => (
                recipe.ingredients.map((ingredient) => (
                  <li key={ingredient.id}>
                    <input type='checkbox' id={ingredient.name}/>
                    <label htmlFor={ingredient.name}>{ingredient.name} ({ingredient.quantity} {ingredient.quantity_description}) </label>
                  </li>
                ))
              ))}
            </ul>
          </div> : ""
        }
      </div>
    </>
  )
}

export default Grocery