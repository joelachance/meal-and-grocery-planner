import React from "react"
import {NavLink} from "react-router-dom"
import {useContext} from "react"
import {UserContext} from '../UserContext'
import '../styles/navbar.css'

function NavBar() {
  const { setUser } = useContext(UserContext)
  function handleLogout() {
    localStorage.removeItem('token')
    setUser(null)
  }
  return (
    <nav className='navbar'>
      <div className='nav-links'>
        <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Home</NavLink>
        <NavLink to="/recipes" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Recipes</NavLink>
        <NavLink to="/Grocery" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Grocery</NavLink>
      </div>
      <button onClick={handleLogout} className='logout-button'>Logout</button>
    </nav>
  )
}

export default NavBar