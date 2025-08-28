import React from "react"
import {NavLink} from "react-router-dom"
import {useContext} from "react"
import {UserContext} from '../UserContext'

function NavBar() {
  const setUser = useContext(UserContext)
  function handleLogout() {
    localStorage.removeItem('token')
    setUser(null)
  }
  return (
    <nav className='navbar'>
      <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Home</NavLink>
      <NavLink to="/recipes" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Recipes</NavLink>
      <NavLink to="/Grocery" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Grocery</NavLink>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  )
}

export default NavBar