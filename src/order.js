import React, { Component } from 'react';

import Breadcrumbs from './components/Breadcrumbs';
import OrderForm from './components/OrderForm';
import ProductInBasket from './components/ProductInBasket';

import { HashRouter, Route, Link, Nav, NavLink, Switch } from 'react-router-dom';

const Order = () => {
    return(
        <div className="wrapper order-wrapper">
            <Breadcrumbs links={[{link: "/main-page", text: "Главная"}, {link: "#", text: "Koрзина"}, {link: "#", text: "Оформление заказа"}]} />                
            <section className="order-process">
                <h2 className="order-process__title">Оформление заказа</h2>                
                <ProductInBasket />
                <OrderForm />            
            </section>
        </div>
    );
}

export default Order;