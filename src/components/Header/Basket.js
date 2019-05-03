import React, { Component } from 'react';

import { HashRouter, Route, Link, Nav, Switch } from 'react-router-dom';

import ProductsBasket from './ProductsBasket';

class Basket extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    const { basketVisibility, productsInBasket, updateBasket } = this.props;

    return(        
      <div className={`hidden-panel__basket basket-dropped ${basketVisibility ? 'hidden-panel__basket_visible' : ''}`}>
        {productsInBasket.length > 0
        ?
        <div className="basket-dropped__wrapper">
          <div className="basket-dropped__title">В вашей корзине:</div>
          <div className="basket-dropped__product-list product-list">
            {productsInBasket.map(el => {
              return(
                <div className="product-list__item">
                  <a className="product-list__pic">
                    <img src={el.item.images[0]} alt="product"/> 
                  </a>
                  <Link to={`/product-card-desktop/${el.item.id}`} className="product-list__product">
                    {el.item.title}
                  </Link>
                  <div className="product-list__fill"></div>
                  <div className="product-list__price">{el.item.price}
                    <i className="fa fa-rub" aria-hidden="true"></i>
                  </div>
                  <div className="product-list__delete">
                    <i 
                      className="fa fa-times" 
                      aria-hidden="true" 
                      onClick={ev => updateBasket(ev, {id: Number(el.item.id), size: Number(el.size), amount: 0})} 
                    >
                    </i>
                  </div>
                </div>
              )
            })}
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