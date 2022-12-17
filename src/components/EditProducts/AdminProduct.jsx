import { MenuItem, Select } from '@mui/material';
import React, { useContext } from 'react';
import GeneralContext from '../../contexts/GeneralContext';

import '../AddProducts/AddProducts.scss';


const AdminProduct = ({ product, setProduct }) => {
  console.log('product', product);
  const { productSpecs } = useContext(GeneralContext);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
  };

  const handleCheckBoxChange = (event) => {
    setProduct({ ...product, display: !product.display });
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

  const uploadImage = async e => {
    const name = e.target.name;
    const files = e.target.files;

    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'theShoeBoxImages');

    const res = await fetch(`https://api.cloudinary.com/v1_1/khaled-cloud/image/upload`,
      {
        method: 'post',
        body: data
      });

    const file = await res.json();
    if (file.secure_url) {
      setProduct({ ...product, [name]: `${file.secure_url}` });
    } else {
      setProduct({ ...product });
    }
  };

  return (
    <div>
      <br />
      <div className='data-images-edit'>
        <div>
          <div className='individuals'>
            <label>Name: </label>
            <input
              name='name'
              value={product.name}
              onChange={handleChange}
              className='input'
              required
              placeholder='Item Name...'></input>
          </div>
          <br />
          <div>
            <label>Category: </label>
            <Select
              required
              name="category_id"
              className='select-tag-inadd'
              value={product.category_id}
              onChange={handleChange}>
              {categories}
            </Select>
          </div>
          <br />
          <div>
            <label>Color: </label>
            <Select
              required
              className='select-tag-inadd'
              name="color_id"
              value={product.color_id}
              onChange={handleChange}>
              {colors}
            </Select>
          </div>
          <br />
          <div className='individuals'>
            <label>Price: </label>
            <input
              name='price'
              onChange={handleChange}
              className='input new-price'
              onWheel={(e) => e.target.blur()}
              required
              type='number'
              placeholder='Item Price...'
              value={product.price}>
            </input>
          </div>
          <div className='all-display'>
            <label style={{ marginRight: '10px' }}>Display In Collection: </label>
            <input
              required
              name='display'
              checked={product.display}
              // value={product.display}
              type='checkbox'
              className='display-in-add'
              onChange={handleCheckBoxChange}
              // onClick={handleDisplay}
              style={{ backgroundColor: "white" }}>
            </input>
          </div>
          <br />
        </div>
        <div>
          <div>
            <label>Image 1: </label>
            <input name='image1' accept={'image/*'} style={{ width: "200px", height: '20px', color: 'rgba(0,0,0,0)' }} type="file" onChange={uploadImage} placeholder='Item Image 1...'></input>
            <div>
              {product.image1 && <img required style={{ height: '75px', width: '75px' }} src={product.image1} alt="preview" />}
            </div>
          </div>
          <div>
            <label>Image 2: </label>
            <input name='image2' accept={'image/*'} style={{ width: "200px", height: '20px', color: 'rgba(0,0,0,0)' }} type="file" onChange={uploadImage} placeholder='Item Image 1...'></input>
            <div>
              {product.image2 && <img required style={{ height: '75px', width: '75px' }} src={product.image2} alt="preview" />}
            </div>
          </div>
          <div>
            <label>Image 3: </label>
            <input name='image3' accept={'image/*'} style={{ width: "200px", height: '20px', color: 'rgba(0,0,0,0)' }} type="file" onChange={uploadImage} placeholder='Item Image 1...'></input>
            <div>
              {product.image3 && <img required style={{ height: '75px', width: '75px' }} src={product.image3} alt="preview" />}
            </div>
          </div>
        </div>
      </div>

      <div>
        <label>Description: </label>
        <textarea
          name="description"
          onChange={handleChange}
          value={product.description}
          required
          style={{ width: "100%", height: '150px', resize: 'none' }}
          placeholder='Item Description...'>
        </textarea>
      </div>

      <button>Save Changes</button>
    </div>
  );
};

export default AdminProduct;