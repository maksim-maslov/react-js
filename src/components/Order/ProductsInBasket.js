import React, { Component } from 'react';

import BasketItem from './BasketItem';

const ProductsInBasket = ({productsInBasket}) => {
    return(
        <div className="order-process__basket order-basket">
            <div className="order-basket__title">в вашей корзине:</div>
            <div className="order-basket__item-list">
              {productsInBasket.map(el => <BasketItem product={el} />)}              
            </div>
            <div className="order-basket__summ">Итого:&nbsp;<span>{productsInBasket.reduce((memo, el) => {memo += el.item.price * el.amount; return memo;}, 0)} <i className="fa fa-rub" aria-hidden="true"></i></span></div>
        </div>
    );
}

export default ProductsInBasket;