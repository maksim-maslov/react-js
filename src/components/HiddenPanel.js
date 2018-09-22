import React, { Component } from 'react';

import { HashRouter, Route, Link, Nav, NavLink, Switch } from 'react-router-dom';

import ListProductsBasket from './ListProductsBasket';

const HiddenPanel = ({productsInBasket = [], updateBasket}) => {

  return(
    <div className="header-main__hidden-panel hidden-panel">
      <div className="hidden-panel__profile">
        <a href="#">Личный кабинет</a>
        <NavLink to="/favorite">
          <i className="fa fa-heart-o" aria-hidden="true"></i>Избранное
        </NavLink>
      </div>
      <div className="hidden-panel__basket basket-dropped">
        <div className="basket-dropped__title">В вашей корзине:</div>
        <div className="basket-dropped__product-list product-list">
          <ListProductsBasket productsInBasket={productsInBasket} updateBasket={updateBasket} />
        </div>
        <NavLink to="/order" className="basket-dropped__order-button">Оформить заказ</NavLink>
      </div>
    </div>
  );
}

export default HiddenPanel;