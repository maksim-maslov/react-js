import React, { Component } from 'react';
import logo from './img/header-logo.png';

import './css/normalize.css';
import './css/font-awesome.min.css';
import './css/style.css';
import './css/style-catalogue.css';
import './css/style-order.css';
import './css/style-favorite.css';
import './css/style-product-card.css';

import Header from './Header';
import Footer from './Footer';
import MainPage from './MainPage';
import Favorite from './Favorite';
import Catalogue from './Catalogue';
import ProductCardDesktop from './ProductCardDesktop';
import Order from './Order';
import OrderDone from './OrderDone';
import Search from './Search';

import { HashRouter, Route, Link, Nav, NavLink, Switch } from 'react-router-dom';

// const ReactRouter = window.ReactRouterDOM;
// const Router = ReactRouterDOM.HashRouter;
// const Route = ReactRouterDOM.Route;
// const Switch = ReactRouterDOM.Switch;
// const NavLink = ReactRouterDOM.NavLink;



class App extends Component {

  render() {
    
    return (
      <HashRouter>
        <div className="container">
          <Header />
          
          <Switch>
          <Route path="/catalogue" component={Catalogue} />
          <Route path="/favorite" component={Favorite} />
          <Route path="/product-card-desktop" component={ProductCardDesktop} />
          <Route path="/order" component={Order} />
          <Route path="/order-done" component={OrderDone} />
          <Route path="/search" component={Search} />
          <Route path="/" component={MainPage} />
          </Switch>

          {/* <MainPage />
          <Catalogue />
          <Favorite />
          <ProductCardDesktop />
          <Order />
          <OrderDone /> */}
          
          <Footer />
        </div>
      </HashRouter>
    );
  }
}

export default App;
