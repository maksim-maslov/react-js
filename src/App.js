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
      categories: [],
      favorites: [],
      browsedProducts: []
    };
  }


  componentDidMount() {              
    const cartId = localStorage.getItem('cartId');
    if (cartId) {
      const params = {method: 'GET'};
      this.getProductsInBasket(`https://neto-api.herokuapp.com/bosa-noga/cart/${cartId}`, params);      
    } 
    this.getCategories();
    this.updateFavorites();
    this.updateBrowsedProducts();
  }


  joinProductIdsToQueryString(products = []) {
    return new Promise((done, fail) => {
      const queryString = products.reduce((memo, el) => {
        console.log('el', el)
        memo = memo + `id[]=${el.id}&`;
        return memo;
      }, '');
      done(queryString);
    });
  }

  updateFavorites() {  
    const favoriteIdList = localStorage.getItem('favorites') 
    ? JSON.parse(localStorage.getItem('favorites')) 
    : [];

    if (favoriteIdList.length === 0) {
      this.setState({ favorites: [] });         
    } else {
      this.joinProductIdsToQueryString(favoriteIdList)
        .then(queryString => fetch(`http://api-neto.herokuapp.com/bosa-noga/products?${queryString}`))
        .then(response => response.json())
        .then(data => this.setState({ favorites: data })); 
    }
  }

  getCategories() {
    fetch('https://neto-api.herokuapp.com/bosa-noga/categories')
      .then(response => response.json())
      .then(data => {this.setState({categories: data.data})});
  }

  getProductsInBasket(url, params, product = []) {
    fetch(url, params)
      .then(response => response.json())
      .then(data => {
        if (data.status == 'ok') {
          let productArray = [];
          if (product.length === 0) {
            // console.log('productArray1', data.data.products); 
            productArray = data.data.products; 
            return productArray;                  
          } else {
            localStorage.cartId = data.data.id;
            // console.log('productArra2y', productArray);   
            productArray = product;
            return productArray;                     
          }          
        } 
        else {
          localStorage.cartId = '';
          this.setState({ productsInBasket: [] })
          throw new Error(`abort promise: status '${data.status}'`);
        }
      })
      .then(productArray => {
        // console.log('productArray', productArray);
        return this.joinProductIdsToQueryString(productArray)
          .then(queryString => fetch(`http://api-neto.herokuapp.com/bosa-noga/products?${queryString}`))
          .then(response => response.json())
          .then(data => {
            return data.data.map((el, index) => {
              return {item: el, size: productArray[index].size, amount: productArray[index].amount};
            });
          })
          .then(data => this.setState({ productsInBasket: data }));           
      })
      .catch(error => console.log(error));     
     
  }

  updateBasket(product) {
    const params = {
      method: 'POST', 
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(product)
    };
    const cartId = localStorage.getItem('cartId');
    if (cartId) {      
      this.getProductsInBasket(`https://neto-api.herokuapp.com/bosa-noga/cart/${cartId}`, params);
    } else {
      this.getProductsInBasket(`https://neto-api.herokuapp.com/bosa-noga/cart/`, params, [product]);        
    }
  }

  updateBrowsedProducts() {  
    const browsedProducts = localStorage.getItem('browsedProducts') 
    ? JSON.parse(localStorage.getItem('browsedProducts')) 
    : [];

    console.log('browsedProducts1478234729', browsedProducts)

    if (browsedProducts.length === 0) {
      this.setState({ browsedProducts: [] });         
    } else {
      this.joinProductIdsToQueryString(browsedProducts)
        .then(queryString => fetch(`http://api-neto.herokuapp.com/bosa-noga/products?${queryString}`))
        .then(response => response.json())
        .then(data => {
          console.log('6875394058908940', data)
          if (data) {
            this.setState({ browsedProducts: data.data }); 

          }
        });
    }
  }

  render() {
    const productsInBasket = this.state.productsInBasket;
    console.log(localStorage);
    console.log(this.state.browsedProducts)

    return (
      <HashRouter>
        <div className="container">
          <Header productsInBasket={productsInBasket} updateBasket={this.updateBasket.bind(this)} categories={this.state.categories} />          
          <Switch>
            <Route path="/catalogue" render={(props) => <Catalogue {...props} updateFavorites={this.updateFavorites.bind(this)} categories={this.state.categories} browsedProducts={this.state.browsedProducts} />} />
            <Route path="/favorite" render={(props) => <Favorite {...props} favorites={this.state.favorites} updateFavorites={this.updateFavorites.bind(this)} joinProductIdsToQueryString={this.joinProductIdsToQueryString.bind(this)} />} /> 
            <Route path="/product-card-desktop/:id" render={(props) => <ProductCardDesktop {...props} updateBasket={this.updateBasket.bind(this)} updateFavorites={this.updateFavorites.bind(this)} updateBrowsedProducts={this.updateBrowsedProducts.bind(this)} categories={this.state.categories} browsedProducts={this.state.browsedProducts} />} />
            <Route path="/order" render={(props) => <Order {...props} productsInBasket={productsInBasket} updateBasket={this.updateBasket.bind(this)} categories={this.state.categories} />} />
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
