import React, { useContext } from 'react';
import GeneralContext from '../../contexts/GeneralContext';
import MenuItem from '@mui/material/MenuItem';

import './AddProducts.scss';
import { Select } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';

const AddProducts = ({ addProduct, setNewSku, setNewName, setNewPrice, setNewDescription, setImage1, setImage2, setImage3, setColor, setCategory, setDisplay, category, color, image1, image2, image3, url1, setUrl1, url2, setUrl2, url3, setUrl3 }) => {
  const { productSpecs } = useContext(GeneralContext);

  const uploadImage1 = () => {
    const data = new FormData();
    data.append("file", image1);
    data.append("upload_preset", "TheHardwareCrew");
    data.append("cloud_name", "khaled-cloud");

    fetch(" https://api.cloudinary.com/v1_1/khaled-cloud/image/upload", {
      method: "post",
      body: data
    })
      .then(resp => resp.json())
      .then(data => {
        console.log("cloud images", data);
        setUrl1(data.secure_url);
      })
      .catch(err => console.log(err));
  };

  const uploadImage2 = () => {
    const data = new FormData();
    data.append("file", image2);
    data.append("upload_preset", "TheHardwareCrew");
    data.append("cloud_name", "khaled-cloud");

    fetch(" https://api.cloudinary.com/v1_1/khaled-cloud/image/upload", {
      method: "post",
      body: data
    })
      .then(resp => resp.json())
      .then(data => {
        console.log("cloud images", data);
        setUrl2(data.secure_url);
      })
      .catch(err => console.log(err));
  };

  const uploadImage3 = () => {
    const data = new FormData();
    data.append("file", image3);
    data.append("upload_preset", "TheHardwareCrew");
    data.append("cloud_name", "khaled-cloud");

    fetch(" https://api.cloudinary.com/v1_1/khaled-cloud/image/upload", {
      method: "post",
      body: data
    })
      .then(resp => resp.json())
      .then(data => {
        console.log("cloud images", data);
        setUrl3(data.secure_url);
      })
      .catch(err => console.log(err));
  };

  const handleColorChange = e => {
    setColor(e.target.value);
  };
  const handleCategoryChange = e => {
    setCategory(e.target.value);
  };

  const categories = productSpecs.categories.map(category => {
    return (
      <MenuItem key={category.id} value={category.id}>{category.category}</MenuItem>
    );
  });

  const colors = productSpecs.colors.map(color => {
    return (
      <MenuItem key={color.id} value={color.id}>{color.color}</MenuItem>
    );
  });

  const handleDisplay = (e) => {
    if (e.target.checked) {
      setDisplay(true);
    } else {
      setDisplay(false);
    }
  };

  const uploadButton = () => {
    if (!image1 || !image2 || !image3) {
      toast("Choose Three Images Please!", { position: "top-right", type: 'error', autoClose: 1500, theme: 'dark' });
    } else {
      uploadImage1();
      uploadImage2();
      uploadImage3();
    }
  };

  return (
    <div className='add-product'>
      <div className='add-product-container'>
        <div className='new-title'>
          Add New Product
        </div>
        <br />
        <br />
        <div className='left-right'>
          <div>
            <div className='individuals'>
              <label>SKU: </label>
              <input onChange={e => { setNewSku(e.target.value); }} className='input' required placeholder='SKU...'></input>
            </div>
            <br />
            <div className='individuals'>
              <label>Name: </label>
              <input onChange={e => { setNewName(e.target.value); }} className='input' required placeholder='Item Name...'></input>
            </div>
            <br />
            <div>
              <label>Category: </label>
              <Select required className='select-tag-inadd' value={category} onChange={handleCategoryChange}>
                {categories}
              </Select>
              {/* <input placeholder='Item Category...'></input> */}
            </div>
            <br />
            <div>
              <label>Color: </label>
              <Select required className='select-tag-inadd' value={color} onChange={handleColorChange}>
                {colors}
              </Select>
              {/* <input placeholder='Item Color...'></input> */}
            </div>
            <br />
            <div className='individuals'>
              <label>Price: </label>
              <input onChange={e => { setNewPrice(e.target.value * 100); }} className='input new-price' onWheel={(e) => e.target.blur()} required type='number' placeholder='Item Price...'></input>
            </div>
            <div className='all-display'>
              <label style={{ marginRight: '10px' }}>Display In Collection: </label>
              <input required type='checkbox' className='display-in-add' onClick={handleDisplay} style={{ backgroundColor: "white" }}></input>
            </div>
            <br />
            <br />
          </div>
          <div className='new-images'>
            <div>
              <label>Image 1: </label>
              <input accept={'image/*'} style={{ width: "200px", height: '20px' }} type="file" onChange={(e) => setImage1(e.target.files[0])} placeholder='Item Image 1...'></input>
              <div>
                {url1 && <img required style={{ height: '75px', width: '75px' }} src={url1} alt="preview" />}
              </div>
            </div>
            <br />
            <div>
              <label>Image 2: </label>
              <input style={{ width: "200px", height: '20px' }} type="file" onChange={(e) => setImage2(e.target.files[0])} placeholder='Item Image 2...'></input>
              <div>
                {url2 && <img style={{ height: '75px', width: '75px' }} src={url2} alt="preview" />}
              </div>
            </div>
            <br />
            <div>
              <label>Image 3: </label>
              <input style={{ width: "200px", height: '20px' }} type="file" onChange={(e) => setImage3(e.target.files[0])} placeholder='Item Image 3...'></input>
              <div>
                {url3 && <img style={{ height: '75px', width: '75px' }} src={url3} alt="preview" />}
              </div>
            </div>
            <button className='upload-images' onClick={uploadButton}>UPLOAD IMAGES</button>
          </div>
        </div>
        <div>
          <label>Description: </label>
          <textarea onChange={e => { setNewDescription(e.target.value); }} required style={{ width: "100%", height: '150px', resize: 'none' }} placeholder='Item Description...'></textarea>
        </div>
        <div className='required-fields'>All Fields Are Required!</div>
        <button onClick={addProduct} className='add-button'>ADD PRODUCT</button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddProducts;