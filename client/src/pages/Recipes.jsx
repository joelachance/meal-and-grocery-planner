import React from "react"
import {useState} from "react"
import NavBar from "../components/NavBar"
import '../styles/recipePage.css'
import {useNavigate} from "react-router-dom"

import RecipesByCuisine from "../components/RecipesByCuisine"

function Recipes() {
  const [cuisine, setCuisine] = useState("")
  const navigate = useNavigate()

  async function handleFetchRecipes(event) {
    const {value} = event.target
    setCuisine(value)
  }

  function handleCreateRecipe() {
    navigate('/recipes//addRecipes')
  }

  return(
    <div>
      <NavBar />
      <div className="recipes-content">
        <div>
          <h1>Browse recipes</h1>
          <button onClick={handleCreateRecipe}>Add your own recipe</button>
        </div>
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