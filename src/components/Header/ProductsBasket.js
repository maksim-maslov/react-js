import React, { Component } from 'react';

import { HashRouter, Route, Link, Nav, Switch } from 'react-router-dom';

class ProductsBasket extends Component {

  constructor(props) {
    super(props); 
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
    const { product } = this.props; 
    return(
      <div className="product-list__item">
        <a className="product-list__pic">
          <img src={product.item.images[0]} alt="product"/> 
        </a>
        <Link to={`/product-card-desktop/${product.item.id}`} className="product-list__product">
          {product.item.title}
        </Link>
        <div className="product-list__fill"></div>
        <div className="product-list__price">{product.item.price}
          <i className="fa fa-rub" aria-hidden="true"></i>
        </div>
        <div className="product-list__delete">
          <i 
            className="fa fa-times" 
            aria-hidden="true" 
            data-id={product.item.id} 
            data-size={product.size} 
            data-amount={product.amount}
            onClick={this.removeProduct.bind(this)} 
          ></i>
        </div>
      </div>
    )
  }
  
} 

export default ProductsBasket;