import React from 'react';

import './Image.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faAnglesLeft, faAnglesRight } from '@fortawesome/free-solid-svg-icons';
library.add(faAnglesLeft, faAnglesRight);


const Image = ({ images, leftImage, rightImage }) => {
  return (
    <div className='image-file'>
      <button className='arrows' onClick={leftImage}>
        <FontAwesomeIcon icon="fa-solid fa-angles-left" />
      </button>
      <img className='single-image' src={`${images[0]}`} alt='single pic' />
      <button className='arrows' onClick={rightImage}>
        <FontAwesomeIcon icon="fa-solid fa-angles-right" />
      </button>
    </div>
  );
};

export default Image;