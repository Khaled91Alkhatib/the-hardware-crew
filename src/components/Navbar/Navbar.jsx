import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../../site-images/logo.png';
import GeneralContext from '../../contexts/GeneralContext';
import { HiMenuAlt4, HiX } from 'react-icons/hi';
import { motion } from 'framer-motion';

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
  const [toggle, setToggle] = useState(false);

  return (
    <div className='nav-buttons'>
      <img onClick={clickLogo} src={logo} alt='logo' />
      <div className='collection-names'>
        <button><NavLink className='collection' to="/products/keyboards">Keyboards</NavLink></button>
        <button><NavLink className='collection' to="/products/mice">Mice</NavLink></button>
        <button><NavLink className='collection' to="/products/headsets">Headsets</NavLink></button>
      </div>
      <div className='app__navbar-menu'>
        <HiMenuAlt4 onClick={() => setToggle(true)} />
        {toggle &&
          <motion.div
            whileInView={{ x: [300, 0] }} /* 300px */
            transition={{ duration: 0.85, ease: 'easeOut' }}
          >
            <HiX onClick={() => setToggle(false)} />
            <ul>
              <button onClick={() => setToggle(false)}><NavLink className='collection' to="/products/keyboards">Keyboards</NavLink></button>
              <button onClick={() => setToggle(false)}><NavLink className='collection' to="/products/mice">Mice</NavLink></button>
              <button onClick={() => setToggle(false)}><NavLink className='collection' to="/products/headsets">Headsets</NavLink></button>
            </ul>
          </motion.div>}
      </div>
      <div>
        <button className='cart'><NavLink to="/shoppingcart"><FontAwesomeIcon icon="fa-solid fa-cart-shopping" size='lg' /><span className='badge'>{cart.length}</span></NavLink></button>
      </div>
    </div>
  );
};

export default Navbar;