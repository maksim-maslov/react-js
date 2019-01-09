import React, { Component } from 'react';

import TopMenu from './TopMenu';
import HeaderMainWrapper from './HeaderMainWrapper';
import HiddenPanel from './HiddenPanel';
import MainMenu from './MainMenu';
import DroppedMenu from './DroppedMenu';

// import {headerHiddenPanelProfileVisibility, headerHiddenPanelBasketVisibility, headerMainSearchVisibility, mainSubmenuVisibility} from './js/script.js';

import { HashRouter, Route, Link, Nav, Switch } from 'react-router-dom';

class Header extends Component {
  constructor(props) {
    super(props);    
  }

  render() {
    const { categories, productsInBasket, updateBasket } = this.props;
    return(
      <header className="header">   
        <TopMenu />
        <div className="header-main">
          <HeaderMainWrapper />
          <HiddenPanel productsInBasket={productsInBasket} updateBasket={updateBasket} />
        </div>
        <MainMenu categories={categories} />
        <DroppedMenu />
      </header>
    );
  }

}

export default Header;