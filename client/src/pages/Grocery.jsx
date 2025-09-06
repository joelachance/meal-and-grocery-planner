import React from "react"
import NavBar from "../components/NavBar"
import { useState, useEffect } from "react"
import {useContext} from "react"
import {UserContext} from '../UserContext'
import '../styles/grocery.css'

function Grocery() {
  const { user } = useContext(UserContext)
  const [recipes, setRecipes] = useState([])
  const today = new Date().toLocaleDateString('en-CA')
  const date =  new Date()
  date.setDate(date.getDate() + 7)
  const week = date.toLocaleDateString('en-CA')
  const [dates, setDates] = useState({ start: today, end: week })
  const [filteredIngredients, setFilteredIngredients] = useState([])
  const [errorMessage, setErrorMessage] = useState("")
  const [hasSubmitted, setHasSubmitted] = useState(false)
  
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
    setHasSubmitted(true)

    if(!dates.start || !dates.end) {
      setErrorMessage('Error, please input a start and end date')
      return
    }
    setErrorMessage("")
    //filter recipes by date range
    const recipeData = recipes.filter((recipe) => {
      return recipe.date >= dates.start && recipe.date <= dates.end
    })
    //put all the ingredients in one array
    const allIngredients = recipeData.flatMap(recipe => recipe.ingredients)
    //sort ingredients alphabetically
    const sortedIngredients = allIngredients.sort((a,b) => a.name.localeCompare(b.name))

    setFilteredIngredients(sortedIngredients)
  }

  
  return(
    <>
      <NavBar />
      <div className='grocery-div'>
        <h2>Generate your Grocery List</h2>
        <p className='directions'>Input dates and recieve a grocery list based on your scheduled recipes</p>
        <form onSubmit={handleSubmit} className='grocery-form'>
          <label htmlFor='start'>Start Date:</label>
          <input type='date' id='start' name='start'value={dates.start} onChange={handleChange}/>
          <label htmlFor='end'>End Date:</label>
          <input type='date' id='end' name='end' value={dates.end} onChange={handleChange}/>
          <button type='submit'>Submit</button>
        </form>
        {errorMessage && <p className='error'>{errorMessage}</p>}
        {hasSubmitted && !errorMessage && filteredIngredients.length === 0 ?
          <p className='no-recipes-message'>No recipes found for these dates</p> : ""
        }
        {hasSubmitted && !errorMessage && filteredIngredients.length > 0 ?
          <div className='grocery-list-div'> 
            {/* <h3>Groceries</h3> */}
            <ul className='grocery-list'>
              {filteredIngredients.map((ingredient) => (
                  <li key={ingredient.id}>
                    <input type='checkbox' id={ingredient.name}/>
                    <label htmlFor={ingredient.name} className='strikethrough'>{ingredient.name} ({ingredient.quantity} {ingredient.quantity_description}) </label>
                  </li>
                ))
              }
            </ul>
          </div> : ""
        }
      </div>
    </>
  )
}

export default Grocery