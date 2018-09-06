import React, { Component } from 'react';

import { HashRouter, Route, Link, Nav, NavLink, Switch } from 'react-router-dom';

const MainMenu = () => {
    return(
        <nav className="main-menu">
            <div className="wrapper">
                <ul className="main-menu__items">
                    <li className="main-menu__item main-menu__item_sales">
                    <NavLink to="/catalogue">Акции</NavLink>
                    </li>
                    <li className="main-menu__item main-menu__item_women">
                    <NavLink to="/catalogue">Женская обувь</NavLink>
                    </li>
                    <li className="main-menu__item main-menu__item_men">
                    <NavLink to="/catalogue">Мужская обувь</NavLink>
                    </li>
                    <li className="main-menu__item main-menu__item_kids">
                    <NavLink to="/catalogue">Детская обувь</NavLink>
                    </li>
                    <li className="main-menu__item main-menu__item_accessories">
                    <NavLink to="/catalogue">Аксессуары</NavLink>
                    </li>
                    <li className="main-menu__item main-menu__item_home">
                    <NavLink to="/catalogue">Для дома</NavLink>
                    </li>
                    <li className="main-menu__item main-menu__item_brands">
                    <NavLink to="/catalogue">Бренды</NavLink>
                    </li>
                    <li className="main-menu__item main-menu__item_new">
                    <NavLink to="/catalogue">Новинки</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default MainMenu;

