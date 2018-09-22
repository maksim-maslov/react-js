import React, { Component } from 'react';

import { HashRouter, Route, Link, Nav, NavLink, Switch } from 'react-router-dom';

class ProductBasket extends Component {

  constructor(props) {
    super(props)
    this.product = props.product;    
    this.state = {
        productInfo: {images: [1]}
    };
  }
  
  componentDidMount() {
    fetch(`https://neto-api.herokuapp.com/bosa-noga/products/${this.product.id}`)
      .then(response => response.json())
      .then(data => {console.log('ProductBasket', data);this.setState({productInfo: data.data})});
  }

  componentWillReceiveProps(newProps) {
    this.product = newProps.product;
  }

  removeProduct(event) {
    const item = event.currentTarget;        
    const id =  Number(item.dataset.id);  
    const size = Number(item.dataset.size);
    const amount = 0;      
    const product = {id, size, amount};         
    this.props.updateBasket(product);
  }

  render() {
    const {productInfo} = this.state;
    return(
      <div className="product-list__item">
        <a className="product-list__pic">
          <img src={productInfo.images[0]} alt="product"/> 
        </a>
        <NavLink to={`/product-card-desktop/${productInfo.id}`} className="product-list__product">
          {productInfo.title}
        </NavLink>
        <div className="product-list__fill"></div>
        <div className="product-list__price">{productInfo.price}
          <i className="fa fa-rub" aria-hidden="true"></i>
        </div>
        <div className="product-list__delete">
          <i className="fa fa-times" aria-hidden="true" onClick={this.removeProduct.bind(this)} data-id={this.product.id} data-size={this.product.size} data-amount={this.product.amount}></i>
        </div>
      </div>
    )
  }
  
} 

export default ProductBasket;