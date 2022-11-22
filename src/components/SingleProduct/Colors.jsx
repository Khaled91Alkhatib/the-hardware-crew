import React from 'react';

import './Colors.scss';

const Colors = ({ allColors, colorHandler }) => {

  const colorsArray = allColors.map(product => {
    console.log('colors', product);
    let colorsClass = "";
    if (product.selected) colorsClass = "color-selected";
    return (
      <div className={colorsClass} key={product.id}>
        <button className={`${product.color.toLowerCase()} color-button`}
          onClick={() => colorHandler(product.id)}
        />
      </div>
    );
  });

  return (
    <div className='color-list'>
      {colorsArray}
    </div>
  );
};

export default Colors;