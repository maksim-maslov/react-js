import React, { Component } from 'react';
// import logo from './img/header-logo.png';

import './css/normalize.css';
import './css/font-awesome.min.css';
import './css/style.css';
import './css/style-catalogue.css';
import './css/style-order.css';
import './css/style-favorite.css';
import './css/style-product-card.css';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import MainPage from './components/MainPage/MainPage';
import Favorite from './components/Favorite/Favorite';
import Catalogue from './components/Catalogue/Catalogue';
import ProductCardDesktop from './components/ProductCardDesktop/ProductCardDesktop';
import Order from './components/Order/Order';
import OrderDone from './components/OrderDone/OrderDone';
import Search from './components/Search/Search';

import { HashRouter, Route, Link, Nav, NavLink, Switch } from 'react-router-dom';

// const ReactRouter = window.ReactRouterDOM;
// const Router = ReactRouterDOM.HashRouter;
// const Route = ReactRouterDOM.Route;
// const Switch = ReactRouterDOM.Switch;
// const NavLink = ReactRouterDOM.NavLink;


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      productsInBasket: [],
      categories: []
    };
  }

  getData(products) {

    const queryString = products.reduce((memo, el) => {
      memo = memo + `id[]=${el.id}&`;
      return memo;
    }, '');

    fetch(`http://api-neto.herokuapp.com/bosa-noga/products?${queryString}`)
      .then(response => response.json())
      .then(data => {
        const productsInBasket = data.data.map((el,index) => {return {item: el, size: products[index].size, amount: products[index].amount};});
        this.setState({ productsInBasket: productsInBasket });
      });

      
  }

  componentDidMount() {
              
    const cartId = localStorage.getItem('cartId');
    if (cartId) {
      fetch(`https://neto-api.herokuapp.com/bosa-noga/cart/${cartId}`,  {method: 'GET'})
        .then(response => response.json())
        .then(data => {
          if (data.status == 'ok') {
            this.getData(data.data.products);
          } else {
            localStorage.cartId = '';
            this.setState({ productsInBasket: [] });
          }
        }); 
    } 

    fetch('https://neto-api.herokuapp.com/bosa-noga/categories')
        .then(response => response.json())
        .then(data => {this.setState({categories: data.data})});

  }

  updateBasket(product) {

    const cartId = localStorage.getItem('cartId');
    if (cartId) {
      fetch(`https://neto-api.herokuapp.com/bosa-noga/cart/${cartId}`, {
          method: 'POST', 
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(product)
        })
        .then(response => response.json())
        .then(data => {
          if (data.status == 'ok') {
            this.getData(data.data.products);
          } else {
            localStorage.cartId = '';
            this.setState({ productsInBasket: [] });
          }
        });
    } else {
      fetch('https://neto-api.herokuapp.com/bosa-noga/cart/', {
          method: 'POST', 
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(product)
        })
        .then(response => response.json())
        .then(data => {
          if (data.status == 'ok') {
            localStorage.cartId = data.data.id;
            this.getData([product]);
          } else {
            localStorage.cartId = '';
            this.setState({ productsInBasket: [] });
          }
        });
        
    }
  }

  render() {
    const productsInBasket = this.state.productsInBasket;

    return (
      <HashRouter>
        <div className="container">
          <Header productsInBasket={productsInBasket} updateBasket={this.updateBasket.bind(this)} categories={this.state.categories} />          
          <Switch>
            <Route path="/catalogue" render={(props) => <Catalogue {...props} categories={this.state.categories} />} />
            <Route path="/favorite" component={Favorite} />
            <Route path="/product-card-desktop/:id" render={(props) => <ProductCardDesktop {...props} updateBasket={this.updateBasket.bind(this)} categories={this.state.categories} />} />
            <Route path="/order" component={Order} />
            <Route path="/order-done" component={OrderDone} />
            <Route path="/search" component={Search} />
            <Route path="/" component={MainPage} />
          </Switch>          
          <Footer />
        </div>
      </HashRouter>
    );
  }
}

export default App;
