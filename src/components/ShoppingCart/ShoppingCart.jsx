import React, { useContext } from 'react';
import "./ShoppingCart.scss";

import PayButton from './PayButton';
import GeneralContext from '../../contexts/GeneralContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrashCan, faSquarePlus, faSquareMinus } from '@fortawesome/free-solid-svg-icons';
library.add(faTrashCan, faSquarePlus, faSquareMinus);


const ShoppingCart = () => {
  const { cart, setCart } = useContext(GeneralContext);
  console.log('cart', cart);

  const cartItemNumber = cart.reduce((pre, cur) => pre + cur.quantity, 0);
  console.log(cartItemNumber);

  const onRemoveClick = (sku) => {
    setCart((pre) => pre.filter((item) => !(sku === item.sku)));
  };

  const totalEndPrice = cart.reduce((total, item) => {
    const totalPriceOfEachProduct = (item.quantity * item.price) / 100;
    return totalPriceOfEachProduct + total;
  }, 0);
  const taxes = (totalEndPrice * 13) / 100;
  const totalAftertaxes = ((totalEndPrice + taxes)).toFixed(2);

  return (
    <div className='shopping-cart'>
      <div className='cart-container'>
        <div className='cart-title'>SHOPPING CART</div>
        <div className='cart-count'>
          {cartItemNumber === 1 ? "1 Item" : `${cartItemNumber} Items`}
        </div>
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
                      <button
                        className='remove-button'
                        onClick={() => onRemoveClick(item.sku)}>
                        <FontAwesomeIcon icon="fa-solid fa-trash-can" style={{ paddingRight: "5px" }} />
                        Remove Item
                      </button>
                    </div>
                  </div>
                </td>
                <td style={{ textAlign: 'center' }}>
                  <div className='minus-quantity-plus'>
                    <button
                      className='plus-minus-button'
                      onClick={() => {
                        if (item.quantity > 1) {
                          const newCart = cart.map((row) => {
                            if (row.sku === item.sku) {
                              return {
                                ...row,
                                quantity: item.quantity - 1
                              };
                            } else {
                              return { ...row };
                            }
                          });
                          setCart(newCart);
                        }
                      }}
                    >
                      <FontAwesomeIcon icon="fa-solid fa-square-minus" />
                    </button>
                    <div>{item.quantity}</div>
                    <button
                      className='plus-minus-button'
                      onClick={() => {
                        const newCart = cart.map((row) => {
                          if (row.sku === item.sku) {
                            return {
                              ...row,
                              quantity: item.quantity + 1
                            };
                          } else {
                            return { ...row };
                          }
                        });
                        setCart(newCart);
                      }}
                    >
                      <FontAwesomeIcon icon="fa-solid fa-square-plus" />
                    </button>
                  </div>
                </td>
                <td style={{ textAlign: 'center' }}>
                  ${((item.price * item.quantity) / 100).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='taxes-total'>
          <div className='taxes'>
            <div>Taxes(13%): </div>
            <div>${taxes.toFixed(2)}</div>
          </div>
          <div className='total'>
            <div>Total: </div>
            <div>${totalAftertaxes}</div>
          </div>
          <PayButton cart={cart} setCart={setCart} />
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;