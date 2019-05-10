import './css/ProductInBasket.css';

import React, { Component } from 'react';

import BasketItem from './BasketItem';

const ProductsInBasket = ({ productsInBasket, total }) => {
  return(
    <div className="order-process__basket order-basket">
      <div className="order-basket__title">В вашей корзине:</div>
      <div className="order-basket__item-list">
        {productsInBasket.map((el, index) => <BasketItem key={index} product={el} />)}              
      </div>
      <div className="order-basket__summ">Итого:&nbsp;<span>{total} <i className="fa fa-rub" aria-hidden="true"></i></span></div>
    </div>
  );
}

export default ProductsInBasket;