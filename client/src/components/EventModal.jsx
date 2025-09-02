function EventModal({event, onClose}) {
  return (
    <div className='event-modal'>
      <h2>{event.title}</h2>
      <p>Date: {event.start.toLocaleDateString()}</p>
      <button onClick={onClose}>X</button>
    </div>
  )
}

export default EventModal