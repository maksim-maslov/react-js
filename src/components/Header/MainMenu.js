import React, { Component } from 'react';

import { mainSubmenuVisibility } from './js/script.js';

import { HashRouter, Route, Link, Nav, Switch } from 'react-router-dom';

class MainMenu extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { categories } = this.props;
    return(
      <nav className="main-menu">
        <div className="wrapper">
          <ul className="main-menu__items">
            <li className="main-menu__item main-menu__item_sales">
              <Link key={0} to={{pathname: '/catalogue', search: `?discounted=true`}} onClick={mainSubmenuVisibility}>Акции</Link>
            </li>
            {categories.map((el, index) => 
              <li key={index + 1} className="main-menu__item main-menu__item_sales" onClick={mainSubmenuVisibility}>
                <Link to={{pathname: '/catalogue', search: `?categoryId=${el.id}`}}>{el.title}</Link>
              </li>                
            )}
          </ul>
        </div>
      </nav>
    )
  }
}

export default MainMenu;

