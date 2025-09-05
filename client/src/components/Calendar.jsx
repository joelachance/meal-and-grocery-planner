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
     const titles = user.recipes.map((event) => {
      return {"title": event.title, "date": event.date}
    })
    setEvents(titles)
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
      {selectedEvent && (
        <EventModal event={selectedEvent} onClose={closeModal}/>
      )}
    </div>
  )
}

export default Calendar