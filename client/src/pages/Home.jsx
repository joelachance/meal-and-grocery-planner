import React from "react"
import NavBar from "../components/NavBar"
import Calendar from '../components/Calendar'
import '../styles/home.css'
import {useNavigate} from "react-router-dom"

function Home() {
  const navigate = useNavigate()

  function handleStart() {
    navigate('/recipes')
  }

  return (
    <div>
      <NavBar />
      <div className='home-content'>
        <button className='start-button' onClick={handleStart}>Start Meal Planning</button>
        <Calendar className='calendar'/>
      </div>
    </div>
  )
}

export default Home