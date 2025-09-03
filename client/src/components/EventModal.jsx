import {useContext} from "react"
import {UserContext} from '../UserContext'
import { useState, useEffect } from "react"
import EditRecipeForm from "./EditRecipeForm"

function EventModal({event, onClose}) {
  const [recipeData, setRecipeData] = useState([])
  const { user } = useContext(UserContext)
  const [editStatus, setEditStatus] = useState(false)

  useEffect(() => {
    const data = user.recipes.filter((recipe) => {
      return recipe.title === event.title
    })

    setRecipeData(data)
  },[])

  function handleEditRecipe() {
    setEditStatus(true)
  }
  

  return (
    <div className='event-modal'>
      <button className='x-button' onClick={onClose}>X</button>
      {editStatus === false &&
        <div className='recipe-modal-div'> 
          <h2>{event.title}</h2>
          <p>{event.start.toLocaleDateString()}</p>
          <div className='modal-buttons'> 
            <button className='edit-button' onClick={handleEditRecipe}>Edit Recipe</button>
            <button className='delete-button'>Delete</button>
          </div>
        </div>
      }
      {editStatus === true &&
        <EditRecipeForm setEditStatus={setEditStatus} recipe={recipeData} onClose={onClose}/>
      }
    </div>
  )
}

export default EventModal