import React, { Component } from 'react';

import { HashRouter, Route, Link, Nav, NavLink, Switch } from 'react-router-dom';

const HiddenPanel = () => {
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
                <div className="product-list__item">
                    <a className="product-list__pic">
                    <img src="img/product-list__pic_1.jpg" alt="product"/> </a>
                    <a href="#" className="product-list__product">Ботинки женские, Baldinini</a>
                    <div className="product-list__fill"></div>
                    <div className="product-list__price">12 360
                    <i className="fa fa-rub" aria-hidden="true"></i>
                    </div>
                    <div className="product-list__delete">
                    <i className="fa fa-times" aria-hidden="true"></i>
                    </div>
                </div>

                <div className="product-list__item">
                    <a className="product-list__pic">
                    <img src="img/product-list__pic_1.jpg" alt="product"/> </a>
                    <a href="#" className="product-list__product">Ботинки женские, Baldinini</a>
                    <div className="product-list__fill"></div>
                    <div className="product-list__price">12 360
                    <i className="fa fa-rub" aria-hidden="true"></i>
                    </div>
                    <div className="product-list__delete">
                    <i className="fa fa-times" aria-hidden="true"></i>
                    </div>
                </div>
                <div className="product-list__item">
                    <a className="product-list__pic">
                    <img src="img/product-list__pic_1.jpg" alt="product"/> </a>
                    <a href="#" className="product-list__product">Ботинки женские, Baldinini</a>
                    <div className="product-list__fill"></div>
                    <div className="product-list__price">12 360
                    <i className="fa fa-rub" aria-hidden="true"></i>
                    </div>
                    <div className="product-list__delete">
                    <i className="fa fa-times" aria-hidden="true"></i>
                    </div>
                </div>
                <div className="product-list__item">
                    <a className="product-list__pic">
                    <img src="img/product-list__pic_1.jpg" alt="product"/> </a>
                    <a href="#" className="product-list__product">Ботинки женские, Baldinini</a>
                    <div className="product-list__fill"></div>
                    <div className="product-list__price">12 360
                    <i className="fa fa-rub" aria-hidden="true"></i>
                    </div>
                    <div className="product-list__delete">
                    <i className="fa fa-times" aria-hidden="true"></i>
                    </div>
                </div>

                </div>
                <NavLink to="/order" className="basket-dropped__order-button">Оформить заказ</NavLink>
            </div>
        </div>
    );
}

export default HiddenPanel;