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
    
    this.updateDroppedMenuVisible = this.updateDroppedMenuVisible.bind(this);
    this.updateBasketVisibility = this.updateBasketVisibility.bind(this);
    this.updateProfileVisibility = this.updateProfileVisibility.bind(this);
    this.updateSearchVisibility = this.updateSearchVisibility.bind(this);    

    this.state = {
      droppedMenuVisible: false,
      basketVisibility: false,
      profileVisibility: false,
      searchVisibility: false      
    }
  }

  updateBasketVisibility() {
    this.setState({
      basketVisibility: !this.state.basketVisibility
    });
    if (this.state.profileVisibility) {
      this.setState({
        profileVisibility: !this.state.profileVisibility
      })
    }
  }

  updateDroppedMenuVisible() {
    this.setState({
      droppedMenuVisible: !this.state.droppedMenuVisible
    });
  }

  updateProfileVisibility() {
    this.setState({
      profileVisibility: !this.state.profileVisibility
    });
    if (this.state.basketVisibility) {
      this.setState({
        basketVisibility: !this.state.basketVisibility
      })
    }
  }

  updateSearchVisibility() {
    this.setState({
      searchVisibility: !this.state.searchVisibility
    });
  }

  render() {
    const { categories, productsInBasket, updateBasket } = this.props;
    const { droppedMenuVisible, basketVisibility, profileVisibility, searchVisibility } = this.state;

    return(
      <header className="header">   
        <TopMenu />
        <div className="header-main">
          <HeaderMainWrapper basketVisibility={basketVisibility} profileVisibility={profileVisibility} searchVisibility={searchVisibility} updateBasketVisibility={this.updateBasketVisibility} updateProfileVisibility={this.updateProfileVisibility} updateSearchVisibility={this.updateSearchVisibility} />
          <HiddenPanel basketVisibility={basketVisibility} profileVisibility={profileVisibility} productsInBasket={productsInBasket} updateBasket={updateBasket} />
        </div>
        <MainMenu categories={categories} updateDroppedMenuVisible={this.updateDroppedMenuVisible} />
        <DroppedMenu droppedMenuVisible={droppedMenuVisible} />
      </header>
    );
  }

}

export default Header;