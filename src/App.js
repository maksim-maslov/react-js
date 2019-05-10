import React, { Component } from 'react';

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

import { HashRouter, Route, Link, Nav, NavLink, Switch } from 'react-router-dom';

class App extends Component {

  constructor(props) {
    super(props);

    this.getFavorites = this.getFavorites.bind(this);
    this.updateBasket = this.updateBasket.bind(this);    
    this.updateBrowsedProducts = this.updateBrowsedProducts.bind(this);
    this.updateFavorites = this.updateFavorites.bind(this);
    this.updateFilters = this.updateFilters.bind(this);

    this.state = {
      browsedProducts: [],
      browsedProductsIdList: localStorage.browsedProducts 
        ? JSON.parse(localStorage.browsedProducts) 
        : [],
      categories: [],
      favorites: {},  
      favoritesIdList: localStorage.favorites 
        ? JSON.parse(localStorage.favorites) 
        : [],       
      filters: {},
      productsInBasket: [],
      cartId: localStorage.cartId 
        ? localStorage.cartId
        : ''
    };

  }

  componentDidMount() {              
    this.getCategories();     
    this.getFavorites();
    this.updateBrowsedProducts();
    this.updateBasket();
  }
  
  joinProductIdsToQueryString(products = []) {

    return new Promise((done, fail) => {

      const queryString = products.reduce((memo, el) => {

        memo = memo + `id[]=${el.id}&`;

        return memo;

      }, '');

      done(queryString);

    });
  }

  updateFavorites(productId) {

    const { favoritesIdList } = this.state;

    const removeElementIndex = favoritesIdList.findIndex(el => el.id == productId);

    removeElementIndex != -1
    ? favoritesIdList.splice(removeElementIndex, 1)
    : favoritesIdList.push({id: productId});   

    this.setState({favoritesIdList: favoritesIdList}); 

    localStorage.favorites = JSON.stringify(favoritesIdList);

    this.getFavorites();

  }

  getFavorites(page = 1) {  

    const { favoritesIdList } = this.state;

    if (favoritesIdList.length) {

      this.joinProductIdsToQueryString(favoritesIdList)
        .then(queryString => {

          if (this.state.filters.sortBy) {
            queryString = queryString + `&sortBy=${this.state.filters.sortBy}`;
          }   

          return fetch(`https://api-neto.herokuapp.com/bosa-noga/products?${queryString}&page[]=${page}`);

        })
        .then(response => response.json())
        .then(data => this.setState({favorites: data})); 

    } else {

      this.setState({favorites: []});

    }

  }

  getCategories() {
    fetch('https://api-neto.herokuapp.com/bosa-noga/categories')
      .then(response => response.json())
      .then(data => this.setState({categories: data.data}));
  }

  updateBasket(product) {

    const cartId = localStorage.cartId;

    if (product) {
      if (!product.size) {
        return;
      } 
      const params = {
        method: 'POST', 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(product)
      };      
      cartId
      ? this.getProductsInBasket(`https://api-neto.herokuapp.com/bosa-noga/cart/${cartId }`, params)
      : this.getProductsInBasket(`https://api-neto.herokuapp.com/bosa-noga/cart/`, params);        
    } else {
      cartId
      ? this.getProductsInBasket(`https://api-neto.herokuapp.com/bosa-noga/cart/${cartId}`, {method: 'GET'})   
      : this.setState({ productsInBasket: [] });
    }          
    
  }

  getProductsInBasket(url, params) {

    fetch(url, params)
      .then(response => response.json())
      .then(data => {

        if (data.status == 'ok') {

          let result; 

          if (/\S+cart\/\S+/.test(url)) {

            result = data.data.products;

          } else {

            const response = JSON.parse(params.body);

            if (response instanceof Array) {
              result = response;
            } else {
              result = new Array(response);
              localStorage.cartId = data.data.id;
            }  

          }

          return result;   

        } else if (/Корзина.+/.test(data.message)) {

          localStorage.cartId = '';

          this.setState({productsInBasket: []});

          throw new Error(`abort promise: status '${data.status}'`);

        }
      })
      .then(productArray => {

        return this.joinProductIdsToQueryString(productArray)
          .then(queryString => fetch(`https://api-neto.herokuapp.com/bosa-noga/products?${queryString}`))
          .then(response => response.json())
          .then(data => {
            return productArray.map((el, index) => {
              return {item: data.data.filter(element => element.id == el.id)[0], size: el.size, amount: el.amount};
            });
          })
          .then(data => this.setState({ productsInBasket: data }));  

      })
      .catch(error => console.log(error));     
     
  }

  updateBrowsedProducts() { 
    const { browsedProductsIdList } = this.state;
    if (browsedProductsIdList.length) {
      this.joinProductIdsToQueryString(browsedProductsIdList)
        .then(queryString => fetch(`https://api-neto.herokuapp.com/bosa-noga/products?${queryString}`))
        .then(response => response.json())
        .then(data => this.setState({ browsedProducts: data.data }));
    }    
  }

  updateFilters(type = '', value = '') {
    
    let { filters } = this.state;

    if (type == 'size' || type == 'heelSize') {

      const size = value;

      if (filters.hasOwnProperty(type)) {

        const index = filters[type].indexOf(size);

        if (index !== -1) {
          filters[type].splice(index, 1);
          filters[type].length === 0
          ? delete filters[type]
          : null;
        } else {
          filters[type].push(size);
        }

      } else {

        filters[type] = [];
        filters[type].push(size);

      }

    } else if (type == 'discounted') {

      value == true
      ? filters.discounted = 'true'
      : delete filters['discounted'];
      
    } else if (type == 'brand') {

      value != '' 
      ? filters[type] = value
      : delete filters[type];  
    
    } else if (type == 'sortBy') {

      filters.sortBy = value;
      this.updateFavorites();

    } else if (type == 'reset') {

      for (let key in filters) {
        delete filters[key];
      } 
      
    } else {

      filters[type] = value;

    } 
      
    this.setState({
      filters: filters
    });

  }

  render() {    
    const { browsedProducts, categories, favorites, favoritesIdList, filters, productsInBasket } = this.state;
    
    return (
      <HashRouter>
        <div className="container">
          <Header 
            categories={categories} 
            productsInBasket={productsInBasket} 
            updateBasket={this.updateBasket}            
          />          
          <Switch>
            <Route path="/catalogue" 
              render={props => <Catalogue 
                {...props} 
                browsedProducts={browsedProducts} 
                categories={categories}   
                favorites={favorites} 
                favoritesIdList={favoritesIdList}   
                filters={filters}                                             
                updateFavorites={this.updateFavorites} 
                updateFilters={this.updateFilters} 
              />} 
            />
            <Route path="/favorite" 
              render={props => <Favorite 
                {...props} 
                favorites={favorites}                 
                // changeFavorites={this.changeFavorites}
                updateFavorites={this.updateFavorites} 
                updateFilters={this.updateFilters}                 
              />} 
            /> 
            <Route path="/product-card-desktop/:id" 
              render={props => <ProductCardDesktop 
                {...props} 
                browsedProducts={browsedProducts}
                categories={categories} 
                favorites={favorites}    
                favoritesIdList={favoritesIdList}              
                updateFavorites={this.updateFavorites}   
                updateBasket={this.updateBasket} 
                updateBrowsedProducts={this.updateBrowsedProducts} 
              />} 
            />
            <Route path="/order" 
              render={props => <Order 
                {...props} 
                categories={categories}                 
                productsInBasket={productsInBasket} 
                updateBasket={this.updateBasket} 
              />} 
            />
            <Route path="/order-done" component={OrderDone} />
            <Route path="/" 
              render={props => <MainPage 
                {...props} 
                categories={categories}                              
                favoritesIdList={favoritesIdList}   
                updateFavorites={this.updateFavorites}                 
              />}
            />
          </Switch>          
          <Footer />
        </div>
      </HashRouter>
    );
  }
}

export default App;
