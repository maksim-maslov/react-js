import React, { Component } from 'react';
import logo from './img/header-logo.png';

import { headerMainSearchVisibility, headerHiddenPanelProfileVisibility, headerHiddenPanelBasketVisibility } from './js/script.js';

import { HashRouter, Route, Link, Nav, Switch, Redirect } from 'react-router-dom';

class HeaderMainWrapper extends Component {
  constructor(props) {
    super(props);
    this.formData = '';
    this.search = {};
    this.state = {
      doRedirect: false
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    const { search } = this.formData;
    this.search = search.value;
    this.setState({
      doRedirect: true     
    });
  }
  
  render() {    
    return(
      <div className="header-main__wrapper wrapper">
        <div className="header-main__phone">
          <a href="tel:+7-495-790-35-03">+7 495 79 03 5 03</a>
          <p>Ежедневно: с 09-00 до 21-00</p>
        </div>
        <div className="header-main__logo">
          <Link to="/">
            <h1>
              <img src={logo} alt="logotype"/>
            </h1>
          </Link>
          <p>Обувь и аксессуары для всей семьи</p>
        </div>
        <div className="header-main__profile">
          <div className="header-main__pics">
            <div className="header-main__pic header-main__pic_search" onClick={headerMainSearchVisibility}></div>
            <div className="header-main__pic_border"></div>
            <div className="header-main__pic header-main__pic_profile" onClick={headerHiddenPanelProfileVisibility}>
              <div className="header-main__pic_profile_menu"></div>
            </div>
            <div className="header-main__pic_border"></div>
            <div className="header-main__pic header-main__pic_basket" onClick={headerHiddenPanelBasketVisibility}>
              <div className="header-main__pic_basket_full">1</div>
              <div className="header-main__pic_basket_menu"></div>
            </div>
          </div>          
            <form className="header-main__search" ref={element => this.formData = element} onSubmit={this.handleSubmit.bind(this)} >
              <input placeholder="Поиск" name="search" />
              <i className="fa fa-search" aria-hidden="true"></i>
            </form>
            {this.state.doRedirect && <Redirect to={{pathname: "catalogue", search: `search=${this.search}`}} />}
        </div>
      </div>
    );
  }
  
}

export default HeaderMainWrapper;