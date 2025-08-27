import './App.css'
import React from "react"
import {Routes, Route} from "react-router-dom"
import PrivateRoutes from './components/PrivateRoutes'
import Login from './pages/Login'
import Home from './pages/Home'
import Recipes from './pages/Recipes'
import Grocery from './pages/Grocery'

function App() {
  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route path='/' element={<Home />}/>
        <Route path='/recipes' element={<Recipes />}/>
        <Route path='/grocery' element={<Grocery />}/>
      </Route>

      <Route path='/login' element={<Login />}/>
    </Routes>
  )
}

export default App
