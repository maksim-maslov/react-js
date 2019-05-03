import React, { Component } from 'react';

import { HashRouter, Route, Link, Nav, Switch } from 'react-router-dom';

class ProductsBasket extends Component {

  constructor(props) {
    super(props); 
  }

  render() {        
    const { product, updateBasket } = this.props; 
    
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
            onClick={ev => updateBasket(ev, {id: Number(product.item.id), size: Number(product.size), amount: 0})} 
          >
          </i>
        </div>
      </div>
    )
  }
  
} 

export default ProductsBasket;