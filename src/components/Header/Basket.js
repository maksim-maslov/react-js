import React, { Component } from 'react';

import { HashRouter, Route, Link, Nav, Switch } from 'react-router-dom';

import ProductsBasket from './ProductsBasket';

class Basket extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    const { productsInBasket, updateBasket } = this.props;

    return(        
      <div className="hidden-panel__basket basket-dropped">
        {productsInBasket.length > 0
        ?
        <div className="basket-dropped__wrapper">
          <div className="basket-dropped__title">В вашей корзине:</div>
          <div className="basket-dropped__product-list product-list">
            {productsInBasket.map(el => <ProductsBasket product={el} updateBasket={updateBasket} />)}
          </div>
          <Link to={{ pathname: '/order'}} className="basket-dropped__order-button">Оформить заказ</Link>
        </div>
        :
        <div className="basket-dropped__title">
          <div>В корзине пока ничего нет. Не знаете, с чего начать? Посмотрите наши новинки!</div>
        </div>
        }
      </div>        
    )       
  }
}

export default Basket;