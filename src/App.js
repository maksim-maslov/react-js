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
      favorites: []
    };
  }


  componentDidMount() {              
    const cartId = localStorage.getItem('cartId');
    // console.log('this.state', cartId)
    if (cartId) {
      const params = {method: 'GET'};
      this.getProductsInBasket(`https://neto-api.herokuapp.com/bosa-noga/cart/${cartId}`, params);      
    } 
    this.getCategories();
    this.updateFavorites();
    // localStorage.clear();
  }


  joinProductIdsToQueryString(products = []) {
    // console.log('ljkghjdtyhdtdr', products)
    return new Promise((done, fail) => {
      // console.log('ljkghjdtyhdtdr', products)
      const queryString = products.reduce((memo, el) => {
        console.log('el', el)
        memo = memo + `id[]=${el.id}&`;
        return memo;
      }, '');
      // console.log('2342536543', queryString)
      done(queryString);
    });
  }

  // createArrayProductsInBasket({data, products}) {
  //   console.log(data)
  //   return data.data.map((el, index) => {
  //     return {item: el, size: products[index].size, amount: products[index].amount};
  //   });
  // }

  // getProducts(products, queryString) {
  //   let result = [];
  //   fetch(`http://api-neto.herokuapp.com/bosa-noga/products?${queryString}`)
  //     .then(response => response.json())
  //     .then(data => result = data);  
  //     console.log({result: result, products: products})    
  //   return {result: result, products: products};
  // }

  updateFavorites() {  
    const favoriteIdList = localStorage.getItem('favorites') 
    ? JSON.parse(localStorage.getItem('favorites')) 
    : [];

    if (favoriteIdList.length === 0) {
      this.setState({ favorites: [] });         
    } else {
      this.joinProductIdsToQueryString(favoriteIdList)
        .then(queryString => {console.log('fgsdhj', queryString);return fetch(`http://api-neto.herokuapp.com/bosa-noga/products?${queryString}`)})
        .then(response => {console.log(response); return response.json()})
        .then(data => this.setState({ favorites: data.data })); 
    }

  //   fetch(`http://api-neto.herokuapp.com/bosa-noga/products?${queryString}`)
  //     .then(response => response.json())
  //     .then(data => {this.setState({ favorite: data.data })});

  //   // this.favoriteIdList = localStorage.getItem('favorite') ? JSON.parse(localStorage.getItem('favorite')) : new Array()

  //   // this.state = {
  //   //   favorites: []
  //   // };
    
  // // }
  
  // // componentDidMount() {
  // //   console.log(this.favoriteIdList)
  // //   this.getData(this.favoriteIdList)
  //   // fetch('https://neto-api.herokuapp.com/bosa-noga/products')
  //   //   .then(response => response.json())
  //   //   .then(data => {this.setState({ favorite: data.data })});
  }

  // getData(products) {

  //   const queryString = products.reduce((memo, el) => {
  //     memo = memo + `id[]=${el.id}&`;
  //     return memo;
  //   }, '');
  //   console.log('queryString', queryString)
  //   fetch(`http://api-neto.herokuapp.com/bosa-noga/products?${queryString}`)
  //     .then(response => response.json())
  //     .then(data => {this.setState({ favorite: data.data })});

  // }
  // }

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
        console.log('productArray', productArray);
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
      // fetch('https://neto-api.herokuapp.com/bosa-noga/cart/', params)
      //   .then(response => response.json())
      //   .then(data => {
      //     if (data.status == 'ok') {
      //       localStorage.cartId = data.data.id;
      //       this.getProductsInBasket([product]);
      //     } else {
      //       localStorage.cartId = '';
      //       this.setState({ productsInBasket: [] });
      //     }
      //   });
        
    }
  }

  render() {
    const productsInBasket = this.state.productsInBasket;
    console.log(localStorage);

    return (
      <HashRouter>
        <div className="container">
          <Header productsInBasket={productsInBasket} updateBasket={this.updateBasket.bind(this)} categories={this.state.categories} />          
          <Switch>
            <Route path="/catalogue" render={(props) => <Catalogue {...props} updateFavorites={this.updateFavorites.bind(this)} categories={this.state.categories} />} />
            <Route path="/favorite" render={(props) => <Favorite {...props} favorites={this.state.favorites} updateFavorites={this.updateFavorites.bind(this)} />} /> 
            <Route path="/product-card-desktop/:id" render={(props) => <ProductCardDesktop {...props} updateBasket={this.updateBasket.bind(this)} updateFavorites={this.updateFavorites.bind(this)} categories={this.state.categories} />} />
            <Route path="/order" render={(props) => <Order {...props} categories={this.state.categories} />} />
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
