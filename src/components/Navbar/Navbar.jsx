import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../../site-images/logo.png';
import GeneralContext from '../../contexts/GeneralContext';

import './Navbar.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
library.add(faCartShopping);


const Navbar = () => {
  const { cart } = useContext(GeneralContext);
  const navigate = useNavigate();
  const clickLogo = () => {
    navigate('/');
  };

  return (
    <div className='nav-buttons'>
      <img onClick={clickLogo} src={logo} alt='logo' />
      <div>
        <button><NavLink className='collection' to="/products/keyboards">Keyboards</NavLink></button>
        <button><NavLink className='collection' to="/products/mice">Mice</NavLink></button>
        <button><NavLink className='collection' to="/products/headsets">Headsets</NavLink></button>
      </div>
      <div>
        <button className='cart'><NavLink to="/shoppingcart"><FontAwesomeIcon icon="fa-solid fa-cart-shopping" size='lg' /><span className='badge'>{cart.length}</span></NavLink></button>
      </div>
    </div>
  );
};

export default Navbar;