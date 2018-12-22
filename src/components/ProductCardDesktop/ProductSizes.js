import React, { Component } from 'react';

class ProductSizes extends Component {
  constructor(props) {
    super(props)
    this.state = {
      size: ''
    };
  }

  handler(size) {
    this.setState({
      size: size
    });
  }

  render() {
    const { sizes } = this.props; 
    const availableSizes = sizes.filter(el => el.available == true); 
    return availableSizes.map((el, index) => <li className={el.size === this.state.size ? 'active' : ''} key={index} onClick={this.handler.bind(this, el.size)}>{el.size}</li>);
  }

} 

export default ProductSizes;