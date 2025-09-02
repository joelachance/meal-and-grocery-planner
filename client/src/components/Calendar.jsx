import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { useState, useEffect } from "react"
import {useContext} from "react"
import {UserContext} from '../UserContext'

function Calendar() {
  const [events, setEvents] = useState([])
  const { user } = useContext(UserContext)

  useEffect(() => {
     const titles = user.recipes.map((event) => {
      return {"title": event.title, "date": event.date}
    })
    setEvents(titles)
  },[])

  return (
    <div className="calendar-wrapper">
      <FullCalendar 
        plugins={[dayGridPlugin]}
        initialView='dayGridMonth'
        events={events}
        fixedWeekCount={false} 
        height="80vh" 
      />
    </div>
  )
}

export default Calendar