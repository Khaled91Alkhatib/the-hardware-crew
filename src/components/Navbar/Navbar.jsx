import React from 'react'
import { NavLink } from 'react-router-dom'

import './Navbar.scss'

const Navbar = () => {
  return (
    <div className='nav-buttons'>
      <button><NavLink to="/products/keyboards">Keyboards</NavLink></button>
      <button><NavLink to="/products/mice">Mice</NavLink></button>
      <button><NavLink to="/products/headsets">Headsets</NavLink></button>
    </div>
  )
}

export default Navbar