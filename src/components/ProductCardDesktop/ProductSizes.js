import './css/ProductSizes.css';

import React from 'react';

function ProductSizes({ sizes, size, changeSize }) {
  return sizes.filter(el => el.available === true).map((el, index) => {
    return (
      <li className={el.size === size ? 'active' : ''}
          key={index} 
          onClick={() => changeSize(el.size)}>
        {el.size}
      </li>
    );
  });  
} 

export default ProductSizes;