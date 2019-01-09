import React, { Component } from 'react';

import { HashRouter, Route, Link, Nav, Switch } from 'react-router-dom';

import Basket from './Basket';

const HiddenPanel = ({ productsInBasket, updateBasket }) => {
  return(
    <div className="header-main__hidden-panel hidden-panel">
      <div className="wrapper">
        <div className="hidden-panel__profile">
          <a href="#">Личный кабинет</a>
          <Link to="/favorite">
            <i className="fa fa-heart-o" aria-hidden="true"></i>Избранное
          </Link>
        </div>
        <Basket productsInBasket={productsInBasket} updateBasket={updateBasket} />
      </div>
    </div>
  );
}

export default HiddenPanel;