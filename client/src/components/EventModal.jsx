import {useContext} from "react"
import {UserContext} from '../UserContext'
import { useState, useEffect } from "react"
import EditRecipeForm from "./EditRecipeForm"
import { deleteRecipe } from "../api/recipes"

function EventModal({event, onClose}) {
  const [recipeData, setRecipeData] = useState([])
  const { user, setUser } = useContext(UserContext)
  const [editStatus, setEditStatus] = useState(false)
  const [deleteRecipeMessage, setdeleteRecipeMessage] = useState(false)

  useEffect(() => {
    const data = user.recipes.filter((recipe) => {
      return recipe.id === Number(event.id)
    })

    setRecipeData(data)
  },[])

  function handleEditRecipe() {
    setEditStatus(true)
  }
 
  async function handleDelete() {
    const recipe_id = recipeData[0].id
    const result = await deleteRecipe(recipe_id)
    if (!result.errors) {
      setdeleteRecipeMessage('Recipe successfully deleted')
      setUser(prev => ({
        ...prev,
        recipes: prev.recipes.filter(r => r.id !== recipe_id)
      }))
    }
  }
  

  return (
    <div className='event-modal'>
      <button className='x-button' onClick={onClose}>X</button>
      {editStatus === false &&
        <div>
          {!deleteRecipeMessage ?
            <div className='recipe-modal-div'> 
              <h2>{event.title}</h2>
              <p>{event.start.toLocaleDateString()}</p>
              <div className='modal-buttons'> 
                <button className='edit-button' onClick={handleEditRecipe}>Edit Recipe</button>
                <button className='delete-button' onClick={handleDelete}>Delete</button>
              </div>
            </div> :
            <p className='success-message'>{deleteRecipeMessage}</p>
          }
        </div>
      }
      {editStatus === true &&
        <EditRecipeForm setEditStatus={setEditStatus} recipe={recipeData} onClose={onClose}/>
      }
    </div>
  )
}

export default EventModal