import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import logo from '../../site-images/logo.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons';
library.add(faDoorOpen);

const AdminNav = ({ user, setUser }) => {
  const navigate = useNavigate()

  const logout = (e) => {
    setUser({name: "", password: ""})
    navigate("/dashboard")
  }

  return (
    <div className='nav-buttons'>
    <img src={logo} alt='logo' />
    <div>
      <button><NavLink className='collection' to="/dashboard/addproducts">Add Products</NavLink></button>
      <button><NavLink className='collection' to="/dashboard/editproducts">Edit Products</NavLink></button>
    </div>
    <div>
      <button onClick={logout} className='cart'><NavLink to="/shoppingcart"><FontAwesomeIcon icon="fa-solid fa-door-open" size='lg' color='red' /><span style={{fontSize:'13px'}}> Log Out</span></NavLink></button>
    </div>
  </div>
  )
}

export default AdminNav