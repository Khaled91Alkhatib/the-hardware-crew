import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import GeneralContext from '../../contexts/GeneralContext';

import Image from './Image';
import Colors from './Colors';

import './SingleProduct.scss';

const SingleProduct = () => {
  const { products, cart, setCart } = useContext(GeneralContext);
  const [id, setId] = useState(Number(useParams().id));
  const [product, setProduct] = useState({});
  const [images, setImages] = useState([]);
  const [allColors, setAllColors] = useState([]);

  useEffect(() => {
    if (product.sku) {
      const productVariations = product.sku.slice(0, 4);
      const allColors = products.filter(product => product.sku.slice(0, 4) === productVariations).map(row => {
        return (row.id === product.id) ? { ...row, selected: true } : { ...row, selected: false };
      });
      setAllColors(allColors);

      const allImages = [];
      if (product.image1) allImages.push(product.image1);
      if (product.image2) allImages.push(product.image2);
      if (product.image3) allImages.push(product.image3);
      setImages(allImages);

      // Used to update the address bar when the product is changed
      window.history.replaceState('', '', `/products/${product.category}/${id}`);
    }
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
  }, []); // eslint-disable-line

  const leftImage = () => {
    const leftImage = images.shift();
    setImages(prev => [...prev, leftImage]);
  };
  const rightImage = () => {
    const rightImage = images.pop();
    setImages(prev => [rightImage, ...prev]);
  };
  console.log("single product", product);

  const colorHandler = (id) => {
    setId(id);
    getProductById(id);
  };

  const addToCart = () => {
    const newCartItem = {
      sku: product.sku,
      name: product.name,
      color: product.color,
      price: product.price,
      image1: product.image1,

      quantity: 1,
    };

    const existingItemInCart = cart.find((item) => {
      return item.sku === newCartItem.sku;
    });

    if (!existingItemInCart) {
      setCart([...cart, newCartItem]);
    } else if (existingItemInCart) {
      existingItemInCart.quantity += 1;
      setCart([...cart]);
    }

  };


  return (
    <div className='single-product'>
      <div className='inner-container'>
        <div>
          <Image images={images} leftImage={leftImage} rightImage={rightImage} />
        </div>
        <div className='product-texts'>
          <div className='product-name'>{product.name}</div>
          <br />
          <div className='price'>${(product.price / 100).toFixed(2)}</div>
          <br />
          <div>Color: {product.color}</div>
          <Colors allColors={allColors} colorHandler={colorHandler} />
          <br />
          <span style={{ textDecoration: 'underline' }} className='description'>Description:</span>
          <div style={{ marginTop: "10px" }}>{product.description}</div>
          <div className='add-to-cart-position'>
            <button onClick={addToCart} className='add-to-cart'>ADD TO CART</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;