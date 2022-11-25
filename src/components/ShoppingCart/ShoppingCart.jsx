import React, { useContext } from 'react';
import "./ShoppingCart.scss";

import GeneralContext from '../../contexts/GeneralContext';

const ShoppingCart = () => {
  const { cart } = useContext(GeneralContext);
  // console.log('cart', cart);

  return (
    <div className='shopping-cart'>
      <div className='cart-container'>
        <div className='cart-title'>SHOPPING CART</div>
        <table>
          <thead>
            <tr className='headers'>
              <th style={{ width: "70%" }}>Item Description</th>
              <th style={{ textAlign: 'center', padding: '8px' }}>Quantity</th>
              <th style={{ textAlign: 'center', padding: '8px' }}>Price</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => (
              <tr className='data-in-table' key={index}>
                <td>
                  <div className='image-to-desc'>
                    <div><img className='image-in-cart' src={item.image1} alt='item pic' /></div>
                    <div className='name-color'>
                      <div className='item-name'>{item.name}</div>
                      <div style={{ color: "rgb(200,200,200)" }}>Color: {item.color}</div>
                      {/* <button>Remove Item</button> */}
                    </div>
                  </div>
                </td>
                <td style={{ textAlign: 'center' }}>
                  {item.quantity}
                </td>
                <td style={{ textAlign: 'center' }}>
                  ${((item.price * item.quantity) / 100).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShoppingCart;