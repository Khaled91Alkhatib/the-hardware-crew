import React from 'react';
import { NavLink } from 'react-router-dom';

import './Product.scss';

const Product = ({ product }) => {
  console.log("khaled", product);

  return (
    <div className='main-in-product'>
      <NavLink to={`${product.id}`}>
        <img src={product.image1} alt='peripherals' />
        <div className='product-in-allproducts'>
          <div className='name-price'>
            <div className='name'>{product.name}</div>
            <div className='price'>${product.price / 100}</div>
          </div>
        </div>
      </NavLink>
    </div>
  );
};

export default Product;