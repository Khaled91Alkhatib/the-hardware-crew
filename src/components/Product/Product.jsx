import React from 'react';
import './Product.scss';

const Product = ({ product }) => {
  console.log("khaled", product);

  return (
    <div className='main-in-product'>
      <img src={product.image1} alt='peripherals' />
      <div className='product-in-allproducts'>
        <div className='name-price'>
          <div className='name'>{product.name}</div>
          <div className='price'>${product.price / 100}</div>
        </div>
      </div>
    </div>
  );
};

export default Product;