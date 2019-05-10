import './css/MainMenu.css';

import React, { Component } from 'react';

import { HashRouter, Route, Link, Nav, Switch } from 'react-router-dom';

class MainMenu extends Component {
  constructor(props) {
    super(props);

    // this.setState({
    //   key: props.key
    // });

    // this.setState({
    //   key: props.key
    // });
        
    // this.updateDroppedMenuVisible.bind(this);
  }

  // componentWillReceiveProps(newProps) {
  //   this.setState({
  //     key: newProps.key
  //   });
  // }

  

  render() {
    const { categories, updateDroppedMenuVisible, itemMenu } = this.props;

    return(
      <nav className="main-menu">
        <div className="wrapper">
          <ul className="main-menu__items">
            <li 
              key={0} 
              className="main-menu__item main-menu__item_sales" 
              onMouseEnter={() => updateDroppedMenuVisible(0, true)}
              onClick={() => updateDroppedMenuVisible(-1, false)}
            >
              <Link to={{pathname: '/catalogue', search: `?discounted=true`}} className={`${itemMenu == 0 ? 'main-menu__item_active' : ''}`} >Акции</Link>
            </li>
            {categories.map((el, index) => 
              <li 
                key={index + 1} 
                className="main-menu__item main-menu__item_sales" 
                onMouseEnter={() => updateDroppedMenuVisible(index + 1, true)}
                onClick={() => updateDroppedMenuVisible(-1, false)} 
              >
                <Link to={{pathname: '/catalogue', search: `?categoryId=${el.id}`}} className={`${itemMenu == index + 1 ? 'main-menu__item_active' : ''}`} >{el.title}</Link>
              </li>                
            )}
          </ul>
        </div>
      </nav>
    )
  }
}

export default MainMenu;

