import React, { useContext } from 'react';
import GeneralContext from '../../contexts/GeneralContext';
import MenuItem from '@mui/material/MenuItem';

import './AddProducts.scss';
import { Select } from '@mui/material';
import { ToastContainer } from 'react-toastify';

const AddProducts = ({ addProduct, setNewSku, setNewName, setNewPrice, setNewDescription, setImage1, setImage2, setImage3, setColor, setCategory, setDisplay, category, color, image1, image2, image3 }) => {
  const { productSpecs } = useContext(GeneralContext);
  console.log('specs', productSpecs);

  // const [image1, setImage1] = useState(null);
  // const [image2, setImage2] = useState(null);
  // const [image3, setImage3] = useState(null);

  // const [color, setColor] = useState("");
  // const [category, setCategory] = useState("");

  // const [newSku, setNewSku] = useState("");
  // const [newName, setNewName] = useState("");
  // const [newPrice, setNewPrice] = useState("");
  // const [newDescription, setNewDescription] = useState("");

  const onImage1Change = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage1(URL.createObjectURL(event.target.files[0]));
    }
  };

  const onImage2Change = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage2(URL.createObjectURL(event.target.files[0]));
    }
  };

  const onImage3Change = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage3(URL.createObjectURL(event.target.files[0]));
    }
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
              <input style={{ width: "200px", height: '20px' }} type="file" onChange={onImage1Change} placeholder='Item Image 1...'></input>
              <div>
                {image1 && <img required style={{ height: '75px', width: '75px' }} src={image1} alt="preview" />}
              </div>
            </div>
            <br />
            <div>
              <label>Image 2: </label>
              <input style={{ width: "200px", height: '20px' }} type="file" onChange={onImage2Change} placeholder='Item Image 2...'></input>
              <div>
                {image2 && <img style={{ height: '75px', width: '75px' }} src={image2} alt="preview" />}
              </div>
            </div>
            <br />
            <div>
              <label>Image 3: </label>
              <input style={{ width: "200px", height: '20px' }} type="file" onChange={onImage3Change} placeholder='Item Image 3...'></input>
              <div>
                {image3 && <img style={{ height: '75px', width: '75px' }} src={image3} alt="preview" />}
              </div>
            </div>
          </div>
        </div>
        <div>
          <label>Description: </label>
          <textarea onChange={e => { setNewDescription(e.target.value); }} required style={{ width: "100%", height: '150px', resize: 'none' }} placeholder='Item Description...'></textarea>
        </div>
        <button onClick={addProduct} className='add-button'>ADD PRODUCT</button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddProducts;