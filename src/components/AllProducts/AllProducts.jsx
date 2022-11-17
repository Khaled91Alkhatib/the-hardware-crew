import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import GeneralContext from '../../contexts/GeneralContext';
import Product from '../Product/Product';

import { getProducts } from '../../helpers/getProducts';

const AllProducts = () => {
  const { products } = useContext(GeneralContext);
  console.log("products", products);
  const [selection, setSelection] = useState([]);
  const category = useParams().id;

  useEffect(() => {
    setSelection(prev => getProducts(products, category));
  }, [products, category]);

  const categoryBasedProducts = selection && selection.map(product => {
    return (
      <Product key={product.id} product={product} />
    );
  });
  // console.log("both", products, category);
  // console.log("selection", selection);

  return (
    <div>
      {/* <h1>Products</h1> */}
      {categoryBasedProducts}
    </div>
  );
};

export default AllProducts;