import React, { Component } from 'react';

class ProductSizes extends Component {
  constructor(props) {
    super(props);    
  }

  render() {
    const { sizes } = this.props; 
    const availableSizes = sizes.filter(el => el.available == true); 
    return availableSizes.map((el, index) => <li className={el.size === this.props.size ? 'active' : ''} key={index} onClick={() => this.props.changeSize(el.size)}>{el.size}</li>);
  }

} 

export default ProductSizes;