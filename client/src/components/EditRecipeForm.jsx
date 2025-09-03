function EditRecipeForm({setEditStatus}) {

  function handleBack() {
    setEditStatus(false)
  }

  return(
    <div className='event-modal'>
      <div>
        <h2>Edit your Recipe</h2>
        <form>
          <div>
            <label htmlFor='title'>Title:</label>
            <input id='title' name='title' type='text' />
          </div>
          <div>
            <label htmlFor='instructions'>Instructions:</label>
            <textarea id='instructions' name='instructions' type='text' />
          </div>
          <div>
            <label htmlFor='date'>Date:</label>
            <input id='date' name='date' type='date' ></input>
          </div>
          <div>
            <button type='submit' >Submit</button>
          </div>
        </form>
      </div>
      <button className='back-button' onClick={handleBack}>Back</button>
    </div>
  )
}

export default EditRecipeForm