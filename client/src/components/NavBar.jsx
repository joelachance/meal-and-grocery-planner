import React from "react"
import {NavLink} from "react-router-dom"

function NavBar() {
  return (
    <nav className='navbar'>
      <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Home</NavLink>
      <NavLink to="/recipes" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Recipes</NavLink>
      <NavLink to="/Grocery" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Grocery</NavLink>
      <button>Logout</button>
    </nav>
  )
}

export default NavBar