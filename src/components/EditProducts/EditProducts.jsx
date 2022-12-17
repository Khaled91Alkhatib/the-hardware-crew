import React, { useContext, useState } from 'react';
import axios from 'axios';
import GeneralContext from '../../contexts/GeneralContext';
import { getProductBySku } from '../../helpers/getProductBySku';

// import "./EditProducts.scss";
import "../AddProducts/AddProducts.scss";
import { toast, ToastContainer } from 'react-toastify';
import AdminProduct from './AdminProduct';

const EditProducts = () => {
  const { products } = useContext(GeneralContext);
  const [sku, setSku] = useState("");
  const [product, setProduct] = useState({});
  // console.log(products);

  function findProduct(event) {
    event.preventDefault();
    const productFound = getProductBySku(products, sku);
    if (productFound) {
      axios.get(`http://localhost:5001/api/products/${productFound.id}`)
        .then((res) => {
          setProduct((prev) => res.data.product);
          // console.log(res.data.product);
        })
        .catch(error => {
          console.log(error.message);
        });
    } else {
      toast("Product Doesn't Exist!", { position: "top-right", type: 'error', autoClose: 1500, theme: 'dark' });
    }
  }

  function reset() {
    setSku("");
    setProduct({});
  };

  return (
    <div className='add-product'>
      <div className='add-product-container'>
        <div className='new-title'>
          Edit Product
        </div>
        <br />
        <br />
        <div>
          <label>SKU: </label>
          <input disabled={Object.keys(product).length !== 0} value={sku} className='input' onChange={(event) => setSku(event.target.value)} required placeholder='SKU...'></input>
          <button className='find-button' onClick={findProduct}>Search</button>
          <button className='reset-button' onClick={reset}>Reset</button>
        </div>
        {product.sku &&
          <AdminProduct product={product} setProduct={setProduct} />
        }
      </div>
      <ToastContainer />
    </div>
  );
};

export default EditProducts;