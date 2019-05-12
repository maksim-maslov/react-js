import './css/ProductSizes.css';

import React from 'react';

const ProductSizes = ({ sizes, size, changeSize }) => {
  return sizes.filter(el => el.available == true).map((el, index) => {
    return(
      <li 
        key={index} 
        className={el.size === size ? 'active' : ''} 
        onClick={() => changeSize(el.size)}
      >{el.size}</li>
    );
  });  
} 

export default ProductSizes;