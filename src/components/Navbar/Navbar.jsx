import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../../site-images/logo.png';

import './Navbar.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
library.add(faCartShopping);


const Navbar = () => {
  const navigate = useNavigate();
  const clickLogo = () => {
    navigate('/');
  };

  return (
    <div className='nav-buttons'>
      <img onClick={clickLogo} src={logo} alt='logo' />
      <div>
        <button><NavLink to="/products/keyboards">Keyboards</NavLink></button>
        <button><NavLink to="/products/mice">Mice</NavLink></button>
        <button><NavLink to="/products/headsets">Headsets</NavLink></button>
      </div>
      <div>
        <button className='cart'><FontAwesomeIcon icon="fa-solid fa-cart-shopping" size='lg' /><span className='badge'>0</span></button>
      </div>
    </div>
  );
};

export default Navbar;