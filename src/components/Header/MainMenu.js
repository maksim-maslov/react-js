import React, { Component } from 'react';

import { HashRouter, Route, Link, Nav, Switch } from 'react-router-dom';

class MainMenu extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const categories = this.props.categories;
    return(
      <nav className="main-menu">
        <div className="wrapper">
          <ul className="main-menu__items">
            <li className="main-menu__item main-menu__item_sales">
              <Link to={{pathname: '/catalogue', search: `?discounted=true`}}>Акции</Link>
            </li>
              {categories.map(el => 
            <li key={el.id} className="main-menu__item main-menu__item_sales">
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

