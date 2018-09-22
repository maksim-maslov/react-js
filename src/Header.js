import React, { Component } from 'react';

import TopMenu from './components/TopMenu';
import HeaderMainWrapper from './components/HeaderMainWrapper';
import HiddenPanel from './components/HiddenPanel';
import MainMenu from './components/MainMenu';
import HeaderMain from './components/HiddenPanel';
import DroppedMenu from './components/DroppedMenu';

import {headerHiddenPanelProfileVisibility, headerHiddenPanelBasketVisibility, headerMainSearchVisibility, mainSubmenuVisibility} from './js/script.js';

import { HashRouter, Route, Link, Nav, NavLink, Switch } from 'react-router-dom';


class Header extends Component {

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
        <MainMenu />
        <DroppedMenu />
      </header>
    );
  }

}

export default Header;