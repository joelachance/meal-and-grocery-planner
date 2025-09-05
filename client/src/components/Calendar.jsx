import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { useState, useEffect } from "react"
import {useContext} from "react"
import {UserContext} from '../UserContext'
import EventModal from './EventModal'

function Calendar() {
  const [events, setEvents] = useState([])
  const { user } = useContext(UserContext)
  const [selectedEvent, setSelectedEvent] = useState(null)

  useEffect(() => {
     const eventsData = user.recipes.map((recipe) => {
      return {"id": recipe.id, "title": recipe.title, "date": recipe.date, "instructions": recipe.instructions, "ingredients": recipe.ingredients}
    })
    
    setEvents(eventsData)
  },[user.recipes])

  function handleEventClick(clickInfo) {
    setSelectedEvent(clickInfo.event)
  }

  function closeModal() {
    setSelectedEvent(null)
  }

  return (
    <div className="calendar-wrapper">
      <FullCalendar 
        plugins={[dayGridPlugin]}
        initialView='dayGridMonth'
        events={events}
        fixedWeekCount={false} 
        height="80vh" 
        eventClick={handleEventClick}
      />
      <p className='home-directions'>Click on a recipe to view or edit</p>
      {selectedEvent && (
        <EventModal event={selectedEvent} onClose={closeModal}/>
      )}
    </div>
  )
}

export default Calendar