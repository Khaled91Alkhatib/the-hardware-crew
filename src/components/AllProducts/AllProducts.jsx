import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import GeneralContext from '../../contexts/GeneralContext';
import Product from '../Product/Product';

import { getProducts } from '../../helpers/getProducts';
import './AllProducts.scss';
// import LinearProgress from '@mui/material/LinearProgress';

const AllProducts = () => {
  const { products } = useContext(GeneralContext);
  // console.log("products", products);
  const [selection, setSelection] = useState([]);
  const category = useParams().id;

  useEffect(() => {
    setSelection(prev => getProducts(products, category));
  }, [products, category]);

  const categoryBasedProducts = selection && selection.map(product => {
    return (
      <Product product={product} key={product.id} />
    );
  });
  // console.log("both", products, category);
  // console.log("selection", selection);

  return (
    <div className='allproducts-main-image'>
      <div className='all-products'>{categoryBasedProducts}</div>

      {/* {products.length === 0 && (
        <div>
          <LinearProgress color="secondary" />
        </div>
      )} */}

    </div>
  );
};

export default AllProducts;