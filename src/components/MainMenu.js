import React, { Component } from 'react';

import { HashRouter, Route, Link, Nav, NavLink, Switch } from 'react-router-dom';

class MainMenu extends Component {

  constructor(props) {
    super(props);

    this.state = {
      categories: []
    };
  }
  
  componentDidMount() {
    fetch('https://neto-api.herokuapp.com/bosa-noga/categories')
      .then(response => response.json())
      .then(data => {this.setState({categories: data.data})});
  }

  render() {
    const {categories} = this.state;
    return(
      <nav className="main-menu">
        <div className="wrapper">
          <ul className="main-menu__items">
            <li className="main-menu__item main-menu__item_sales">
              <NavLink to="/catalogue">Акции</NavLink>
            </li>
              {categories.map(el => 
            <li key={el.id} className="main-menu__item main-menu__item_sales">
              <NavLink to={`/catalogue?categoryId=${el.id}`}>{el.title}</NavLink>
            </li>                
            )}
          </ul>
        </div>
      </nav>
    )
  }
}

export default MainMenu;

