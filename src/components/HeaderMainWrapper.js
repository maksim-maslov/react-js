import React, { Component } from 'react';
import logo from '../img/header-logo.png';

import { HashRouter, Route, Link, Nav, NavLink, Switch } from 'react-router-dom';




const HeaderMainWrapper = () => {
    return(
        <div className="header-main__wrapper wrapper">
            <div className="header-main__phone">
                <a href="tel:+7-495-790-35-03">+7 495 79 03 5 03</a>
                <p>Ежедневно: с 09-00 до 21-00</p>
            </div>
            <div className="header-main__logo">
                <NavLink to="/">
                <h1>
                    <img src={logo} alt="logotype"/>
                </h1>
                </NavLink>
                <p>Обувь и аксессуары для всей семьи</p>
            </div>
            <div className="header-main__profile">
                <div className="header-main__pics">
                <div className="header-main__pic header-main__pic_search">

                </div>
                <div className="header-main__pic_border"></div>
                <div className="header-main__pic header-main__pic_profile">
                    <div className="header-main__pic_profile_menu"></div>
                </div>
                <div className="header-main__pic_border"></div>
                <div className="header-main__pic header-main__pic_basket">
                    <div className="header-main__pic_basket_full">1</div>
                    <div className="header-main__pic_basket_menu"></div>
                </div>
                </div>
                <form className="header-main__search" action="/search">
                <input placeholder="Поиск"/>
                <i className="fa fa-search" aria-hidden="true"></i>
                </form>
            </div>
        </div>
    );
}

export default HeaderMainWrapper;