import React from 'react';

const Product = ({ product }) => {
  console.log("khaled", product);
  return (
    <div>{product.name}</div>
  );
};

export default Product;