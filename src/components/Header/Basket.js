import React, { Component } from 'react';

import { HashRouter, Route, Link, Nav, Switch } from 'react-router-dom';

import ProductsBasket from './ProductsBasket';

class Basket extends Component {
  constructor(props) {
    super(props);

    this.products = props.productsInBasket;
  }
  
  render() {
    if (this.props.productsInBasket.length) {
      return(
        <div className="hidden-panel__basket basket-dropped">
          <div className="basket-dropped__title">В вашей корзине:</div>
          <div className="basket-dropped__product-list product-list">
            {this.props.productsInBasket.map(el => <ProductsBasket product={el} updateBasket={this.props.updateBasket} />)}
          </div>
          <Link to={{ pathname: '/order'}} className="basket-dropped__order-button">Оформить заказ</Link>
        </div>
      )
    } else {
      return(
        <div className="hidden-panel__basket basket-dropped">
          <div className="basket-dropped__title">
            <div>В корзине пока ничего нет. Не знаете, с чего начать? Посмотрите наши новинки!</div>
          </div>          
        </div>
      )
    }    
  }

}

Basket.defaultProps = {productsInBasket: []};

export default Basket;