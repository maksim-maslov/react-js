import React, { Component } from 'react';

import { HashRouter, Route, Link, Nav, NavLink, Switch } from 'react-router-dom';

class ProductsBasket extends Component {

  constructor(props) {
    super(props)
    this.product = props.product; 
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
    const productInfo = this.props.product; 
    return(
      <div className="product-list__item">
        <a className="product-list__pic">
          <img src={productInfo ? productInfo.item.images[0] : ""} alt="product"/> 
        </a>
        <NavLink to={`/product-card-desktop/${productInfo.item.id}`} className="product-list__product">
          {productInfo.item.title}
        </NavLink>
        <div className="product-list__fill"></div>
        <div className="product-list__price">{productInfo.item.price}
          <i className="fa fa-rub" aria-hidden="true"></i>
        </div>
        <div className="product-list__delete">
          <i className="fa fa-times" aria-hidden="true" onClick={this.removeProduct.bind(this)} data-id={productInfo.item.id} data-size={productInfo.size} data-amount={productInfo.amount}></i>
        </div>
      </div>
    )
  }
  
} 

export default ProductsBasket;