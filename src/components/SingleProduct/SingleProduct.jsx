import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import GeneralContext from '../../contexts/GeneralContext';

import Image from './Image';

import './SingleProduct.scss';

const SingleProduct = () => {
  const { products } = useContext(GeneralContext);
  const [id, setId] = useState(Number(useParams().id));
  const [product, setProduct] = useState({});
  const [images, setImages] = useState([]);

  useEffect(() => {
    const allImages = [];
    if (product.image1) allImages.push(product.image1);
    if (product.image2) allImages.push(product.image2);
    if (product.image3) allImages.push(product.image3);
    setImages(allImages);

    window.history.replaceState('', '', `/products/${product.category}/${id}`);

  }, [products, product, id]);

  const getProductById = (id) => {
    axios.get(`http://localhost:5001/api/products/${id}`)
      .then((res) => {
        setProduct(prev => res.data.product);
        console.log('first', res.data.product);
      });
  };

  useEffect(() => {
    if (products) {
      getProductById(id);
    }
  }, []);

  const leftImage = () => {
    const leftImage = images.shift();
    setImages(prev => [...prev, leftImage]);
  };
  const rightImage = () => {
    const rightImage = images.pop();
    setImages(prev => [rightImage, ...prev]);
  };
  console.log("single product", product);


  return (
    <div className='single-product'>
      <div className='inner-container'>
        <div>
          <Image images={images} leftImage={leftImage} rightImage={rightImage} />
        </div>
        <div className='product-texts'>
          <div className='product-name'>{product.name}</div>
          <br />
          <div>${(product.price / 100).toFixed(2)}</div>
          <br />
          <div>Color: {product.color}</div>
          <br />
          <span style={{ textDecoration: 'underline' }} className='description'>Description:</span>
          <div style={{ marginTop: "10px" }}>{product.description}</div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;