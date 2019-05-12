import './css/Header.css';

import DroppedMenu from './DroppedMenu';
import HeaderMainWrapper from './HeaderMainWrapper';
import HiddenPanel from './HiddenPanel';
import Loader from '../Loader/Loader';
import MainMenu from './MainMenu';
import TopMenu from './TopMenu';

import React, { Component } from 'react';
import { HashRouter, Route, Link, Nav, Switch } from 'react-router-dom';


class Header extends Component {
  constructor(props) {
    super(props); 
    
    this.state = {
      droppedMenuVisible: false,
      basketVisibility: false,
      profileVisibility: false,
      searchVisibility: false,
      itemMenu: -1      
    };

    this.updateDroppedMenuVisible = this.updateDroppedMenuVisible.bind(this);
    this.updateBasketVisibility = this.updateBasketVisibility.bind(this);
    this.updateProfileVisibility = this.updateProfileVisibility.bind(this);
    this.updateSearchVisibility = this.updateSearchVisibility.bind(this);
  }


  updateBasketVisibility() {
    this.setState({basketVisibility: !this.state.basketVisibility});

    if (this.state.profileVisibility) {
      this.setState({profileVisibility: !this.state.profileVisibility})
    }
  }


  updateProfileVisibility() {
    this.setState({profileVisibility: !this.state.profileVisibility});

    if (this.state.basketVisibility) {
      this.setState({basketVisibility: !this.state.basketVisibility})
    }
  }


  updateSearchVisibility() {
    this.setState({searchVisibility: !this.state.searchVisibility});
  }


  updateDroppedMenuVisible(itemMenu, isVisible) {

    if (itemMenu == 0) {
      this.setState({itemMenu: itemMenu});
      return;
    }

    this.setState({
      itemMenu: itemMenu,
      droppedMenuVisible: isVisible
    });
  }


  render() {
    const { categories, productsInBasket, updateBasket } = this.props;
    const { droppedMenuVisible, basketVisibility, profileVisibility, searchVisibility, itemMenu } = this.state;

    return(
      <header className="header">   

        <TopMenu />

        <div className="header-main">
          <HeaderMainWrapper basketVisibility={basketVisibility} profileVisibility={profileVisibility} searchVisibility={searchVisibility} updateBasketVisibility={this.updateBasketVisibility} updateProfileVisibility={this.updateProfileVisibility} updateSearchVisibility={this.updateSearchVisibility} />
          <HiddenPanel basketVisibility={basketVisibility} profileVisibility={profileVisibility} productsInBasket={productsInBasket} updateBasket={updateBasket} />
        </div>

        {categories.length
        ? <MainMenu categories={categories} updateDroppedMenuVisible={this.updateDroppedMenuVisible} itemMenu={itemMenu} droppedMenuVisible={droppedMenuVisible} />
        : <Loader />}
        
        <DroppedMenu droppedMenuVisible={droppedMenuVisible} updateDroppedMenuVisible={this.updateDroppedMenuVisible} />

      </header>
    );
  }
}

export default Header;