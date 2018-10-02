import React, { Component } from 'react';

import TopMenu from './components/Header/TopMenu';
import HeaderMainWrapper from './components/Header/HeaderMainWrapper';
import HiddenPanel from './components/Header/HiddenPanel';
import MainMenu from './components/Header/MainMenu';
import DroppedMenu from './components/Header/DroppedMenu';

import {headerHiddenPanelProfileVisibility, headerHiddenPanelBasketVisibility, headerMainSearchVisibility, mainSubmenuVisibility} from './components/Header/js/script.js';

import { HashRouter, Route, Link, Nav, NavLink, Switch } from 'react-router-dom';


class Header extends Component {
  constructor(props) {
    super(props);
    
  }

  componentDidMount() {
    
    let headerProfile = document.querySelector('.header-main__pic_profile');
    let headerBasket = document.querySelector('.header-main__pic_basket');
    headerProfile.onclick = headerHiddenPanelProfileVisibility;
    headerBasket.onclick = headerHiddenPanelBasketVisibility;

    let headerSearch = document.querySelector('.header-main__pic_search');
    headerSearch.onclick = headerMainSearchVisibility;

    let mainMenuItems = document.querySelectorAll('.main-menu__item');

    for (let item of mainMenuItems) {
      item.onclick = mainSubmenuVisibility;
    }

  }

  render() {
    return(
      <header className="header">   
        <TopMenu />
        <div className="header-main">
          <HeaderMainWrapper />
          <HiddenPanel productsInBasket={this.props.productsInBasket} updateBasket={this.props.updateBasket} />
        </div>
        <MainMenu categories={this.props.categories} />
        <DroppedMenu />
      </header>
    );
  }

}

export default Header;