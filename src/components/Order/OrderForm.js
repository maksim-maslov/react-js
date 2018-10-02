import React, { Component } from 'react';

import { HashRouter, Route, Link, Nav, NavLink, Switch } from 'react-router-dom';

const OrderForm = () => {
    return(
        <div className="order-process__confirmed">
            <form action="#">
            <div className="order-process__delivery">
                <h3 className="h3">кому и куда доставить?</h3>
                <div className="order-process__delivery-form">
                <label className="order-process__delivery-label">
                    <div className="order-process__delivery-text">Имя</div>
                    <input className="order-process__delivery-input" type="text" name="delivery" placeholder="Представьтесь, пожалуйста"/>
                </label>
                <label className="order-process__delivery-label">
                    <div className="order-process__delivery-text">Телефон</div>
                    <input className="order-process__delivery-input" type="tel" name="delivery" placeholder="Номер в любом формате"/>
                </label>
                <label className="order-process__delivery-label">
                    <div className="order-process__delivery-text">Адрес</div>
                    <input className="order-process__delivery-input order-process__delivery-input_adress" type="text" name="delivery" placeholder="Ваша покупка будет доставлена по этому адресу"/>
                </label>
                </div>
                <p>Все поля обязательны для заполнения. Наш оператор свяжется с вами для уточнения деталей заказа.</p>
            </div>
            <div className="order-process__paid">
                <h3 className="h3">хотите оплатить онлайн или курьеру при получении?</h3>
                <div className="order-process__paid-form">
                <label className="order-process__paid-label">
                    <input className="order-process__paid-radio" type="radio" name="paid" value="card-online"/><span className="order-process__paid-text">Картой онлайн</span>
                </label>
                <label className="order-process__paid-label">
                    <input className="order-process__paid-radio" type="radio" name="paid" value="card-courier" checked=""/><span className="order-process__paid-text">Картой курьеру</span>
                </label>
                <label className="order-process__paid-label">
                    <input className="order-process__paid-radio" type="radio" name="paid" value="cash"/><span className="order-process__paid-text">Наличными курьеру</span>
                </label>
                </div>
            </div>
            <NavLink to="order-done"><button className="order-process__form-submit order-process__form-submit_click">Подтвердить заказ</button></NavLink>
            </form>
        </div>
    );
}

export default OrderForm;