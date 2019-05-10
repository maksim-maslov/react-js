import './css/ProductSizes.css';

import React, { Component } from 'react';

class ProductSizes extends Component {
  constructor(props) {
    super(props);    
  }

  render() {
    const { sizes, size, changeSize } = this.props;
    const availableSizes = sizes.filter(el => el.available == true); 
    return availableSizes.map((el, index) => <li key={index} className={el.size === size ? 'active' : ''} onClick={() => changeSize(el.size)}>{el.size}</li>);
  }

} 

export default ProductSizes;