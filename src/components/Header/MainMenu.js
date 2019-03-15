import React, { Component } from 'react';

import { HashRouter, Route, Link, Nav, Switch } from 'react-router-dom';

class MainMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      key: -1
    };
        
    this.updateDroppedMenuVisible.bind(this);
  }

  updateDroppedMenuVisible(event, key) {
    this.setState({
      key: key
    });
    if (event.target.classList.contains('main-menu__item_active')) {
      event.target.classList.remove('main-menu__item_active');
    }
    this.props.updateDroppedMenuVisible();
  }

  render() {
    const { categories } = this.props;
    const { key } = this.state;

    return(
      <nav className="main-menu">
        <div className="wrapper">
          <ul className="main-menu__items">
            <li key={0} className="main-menu__item main-menu__item_sales" onClick={ev => this.updateDroppedMenuVisible(ev, 0)}>
              <Link to={{pathname: '/catalogue', search: `?discounted=true`}} className={`${key == 0 ? 'main-menu__item_active' : ''}`} >Акции</Link>
            </li>
            {categories.map((el, index) => 
              <li key={index + 1} className="main-menu__item main-menu__item_sales" onClick={ev => this.updateDroppedMenuVisible(ev, index + 1)}>
                <Link to={{pathname: '/catalogue', search: `?categoryId=${el.id}`}} className={`${key == index + 1 ? 'main-menu__item_active' : ''}`} >{el.title}</Link>
              </li>                
            )}
          </ul>
        </div>
      </nav>
    )
  }
}

export default MainMenu;

