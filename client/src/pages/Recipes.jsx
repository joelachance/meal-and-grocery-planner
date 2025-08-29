import React from "react"
import {useState} from "react"
import NavBar from "../components/NavBar"
import '../styles/recipePage.css'

import RecipesByCuisine from "../components/RecipesByCuisine"

function Recipes() {
  const [cuisine, setCuisine] = useState("")
  async function handleFetchRecipes(event) {
    const {value} = event.target
    setCuisine(value)
  }
  return(
    <div>
      <NavBar />
      <div className="recipes-content">
        <h1>Browse recipes</h1>
        <div className='cuisine-buttons'>
          <button onClick={handleFetchRecipes} value={'italian'}>Italian</button>
          <button onClick={handleFetchRecipes} value={'greek'}>Greek</button>
          <button onClick={handleFetchRecipes} value={'mexican'}>Mexican</button>
          <button onClick={handleFetchRecipes} value={'thai'}> Thai</button>
          <button onClick={handleFetchRecipes} value={'american'}>American</button>
        </div>
        {cuisine && <RecipesByCuisine cuisine={cuisine}/>}
      </div>
    </div>
  )
}

export default Recipes