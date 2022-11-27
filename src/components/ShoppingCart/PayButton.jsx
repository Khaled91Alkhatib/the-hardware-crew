import React from 'react';
import axios from 'axios';
import './PayButton.scss'

const payButton = ({ cart, setCart }) => {
  // async function handleCheckout() {
  //   let response;
  //   try {
  //     response = await axios.post("http://localhost:5001/api/stripe/create-checkout-session", { cart });
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   if (response.data.url) {
  //     window.location.href = response.data.url;
  //   }
  //   if (response.data.status === 'success') {
  //     setCart([])
  //   }
  // }
  async function handleCheckout() {
    await axios.post("http://localhost:5001/api/stripe/create-checkout-session", { cart, setCart })
      .then((res) => {
        console.log("pay", res);
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

export default payButton;