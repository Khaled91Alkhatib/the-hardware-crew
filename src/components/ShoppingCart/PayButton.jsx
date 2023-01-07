import React, { useContext } from 'react';
import axios from 'axios';
import './PayButton.scss'
import GeneralContext from '../../contexts/GeneralContext';

const PayButton = ({ cart, setCart }) => {
  const { siteUrl } = useContext(GeneralContext)

  async function handleCheckout() {
    await axios.post(`${siteUrl}/create-checkout-session`, { cart })
      .then((res) => {
        // console.log("pay", res);
        if (res.data.url) {
          window.location.href = res.data.url;
        }
      }).catch((err) => console.log("error", err.message));
  };

  return (
    <>
      <button className='checkout-button' onClick={() => handleCheckout()}>
        CHECKOUT
      </button>
    </>
  );
};

export default PayButton;