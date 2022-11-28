import React, { useContext, useEffect } from 'react';
import './ThankYou.scss';

import GeneralContext from '../../contexts/GeneralContext';

const ThankYou = () => {
  const { cart, setCart } = useContext(GeneralContext);

  useEffect(() => {
    if (cart.length > 0) {
      setCart([]);
    }
  }, [setCart, cart]);
  // console.log('hon', cart)
  return (
    <div className='thank-you'>
      <div style={{ textDecoration: 'underline', fontSize: '35px' }}>
        PAYMENT SUCCESSFUL
      </div>
      <br />
      <div>
        Our team is taking care of your order!
      </div>
      <br />
      <div>
        Thank You For Choosing
      </div>
      <div>
        <em>THE HARDWARE CREW</em>
      </div>
    </div>
  );
};

export default ThankYou;