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

import { HashRouter, Route, Link, Nav, NavLink, Switch } from 'react-router-dom';

// const ReactRouter = window.ReactRouterDOM;
// const Router = ReactRouterDOM.HashRouter;
// const Route = ReactRouterDOM.Route;
// const Switch = ReactRouterDOM.Switch;
// const NavLink = ReactRouterDOM.NavLink;


class App extends Component {

  constructor(props) {
    super(props);

    this.changeFavorites = this.changeFavorites.bind(this);
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

    console.log(this.state)
  }


  componentDidMount() {              
    // const cartId = localStorage.cartId;
    this.getCategories();     
    this.updateFavorites();
    this.updateBrowsedProducts();
    this.state.cartId
    ? this.getProductsInBasket(`https://neto-api.herokuapp.com/bosa-noga/cart/${this.state.cartId}`, {method: 'GET'})   
    : null;
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

  changeFavorites(productId) {
    const { favoritesIdList } = this.state;
    const removeElementIndex = favoritesIdList.findIndex(el => el.id == productId);
    removeElementIndex != -1
    ? favoritesIdList.splice(removeElementIndex, 1)
    : favoritesIdList.push({id: productId});    
    this.setState({favoritesIdList: favoritesIdList}); 
    localStorage.favorites = JSON.stringify(favoritesIdList);
    this.updateFavorites();
  }

  updateFavorites(page = 1) {  
    const { favoritesIdList } = this.state;
    if (favoritesIdList.length) {
      this.joinProductIdsToQueryString(favoritesIdList)
        .then(queryString => {
          if (this.state.filters.sortBy) {
            queryString = queryString + `&sortBy=${this.state.filters.sortBy}`;
          }          
          return fetch(`http://api-neto.herokuapp.com/bosa-noga/products?${queryString}&page[]=${page}`)
        })
        .then(response => response.json())
        .then(data => this.setState({favorites: data})); 
    }
  }

  getCategories() {
    fetch('https://neto-api.herokuapp.com/bosa-noga/categories')
      .then(response => response.json())
      .then(data => this.setState({categories: data.data}));
  }

  updateBasket(product) {
    const params = {
      method: 'POST', 
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(product)
    };
    const cartId = localStorage.cartId;
    cartId
    ? this.getProductsInBasket(`https://neto-api.herokuapp.com/bosa-noga/cart/${cartId}`, params)
    : this.getProductsInBasket(`https://neto-api.herokuapp.com/bosa-noga/cart/`, params);        
    
  }

  getProductsInBasket(url, params) {
    fetch(url, params)
      .then(response => response.json())
      .then(data => {
        if (data.status == 'ok') {
          return /\S+cart\/\S+/.test(url)
          ? data.data.products
          : JSON.parse(params.body);       
        } else {
          localStorage.cartId = '';
          this.setState({productsInBasket: []})
          throw new Error(`abort promise: status '${data.status}'`);
        }
      })
      .then(productArray => {
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

  updateBrowsedProducts(id) { 
    const { browsedProductsIdList } = this.state;
    if (browsedProductsIdList.length) {
      this.joinProductIdsToQueryString(browsedProductsIdList)
        .then(queryString => fetch(`http://api-neto.herokuapp.com/bosa-noga/products?${queryString}`))
        .then(response => response.json())
        .then(data => this.setState({ browsedProducts: data.data.filter(el => el.id != id) }));
    }    
  }

  updateFilters(event) {

    let { filters } = this.state;

    if (event.currentTarget.classList.contains('sidebar__size')) {

      const size = event.target.value;
      if (filters.hasOwnProperty('size[]')) {
        const index = filters['size[]'].indexOf(size);
        if (index !== -1) {
          filters['size[]'].splice(index, 1);
          filters['size[]'].length === 0
          ? delete filters['size[]']
          : null;
        } else {
          filters['size[]'].push(size);
        }
      } else {
        filters['size[]'] = [];
        filters['size[]'].push(size);
      }

    } else if (event.currentTarget.classList.contains('sidebar__heel-height')) {

      const heelSize = event.target.value;
      if (filters.hasOwnProperty('heelSize[]')) {
        const index = filters['heelSize[]'].indexOf(heelSize);
        if (index !== -1) {
          filters['heelSize[]'].splice(index, 1);
          filters['heelSize[]'].length === 0
          ? delete filters['heelSize[]']
          : null;
        } else {
          filters['heelSize[]'].push(heelSize);
        }
      } else {
        filters['heelSize[]'] = [];
        filters['heelSize[]'].push(heelSize);
      }

    } else if (event.currentTarget.classList.contains('checkbox-discount')) {

      filters.hasOwnProperty('discounted')
      ? delete filters['discounted']
      : filters.discounted = 'true'; 

    } else {

      event.preventDefault();
      
      if (event.currentTarget.classList.contains('sidebar__catalogue-list')) {
        filters.type = event.target.textContent;
      }

      if (event.currentTarget.classList.contains('sidebar__color')) {
        filters.color = event.target.textContent;
      }

      if (event.currentTarget.classList.contains('sidebar__occasion')) {
        filters.reason = event.target.textContent;
      }

      if (event.currentTarget.classList.contains('sidebar__season')) {
        filters.season = event.target.textContent;
      }

      if (event.currentTarget.classList.contains('product-catalogue__sort-by')) {
        filters.sortBy = event.target.value;
        this.updateFavorites();
      }     

      if (event.currentTarget.classList.contains('brand-search')) {
        
        const {search, button} = event.currentTarget;
        if (search.value == '') {
          delete filters['brand'];
        } else {
          filters.brand = search.value;
        }

      }

      if (event.currentTarget.classList.contains('drop-down')) {
        for (let key in filters) {
          delete filters[key];
        } 
        const checkboxes = document.querySelectorAll(`.sidebar [type="checkbox"]`);
        Array.from(checkboxes).forEach(el => el.checked = false);
        const search = document.querySelector(`.sidebar [name="search"]`);
        search.value = '';
      }

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
                changeFavorites={this.changeFavorites}             
                favorites={favorites} 
                favoritesIdList={favoritesIdList}                                
                filters={filters}                
                updateFilters={this.updateFilters} 
              />} 
            />
            <Route path="/favorite" 
              render={props => <Favorite 
                {...props} 
                changeFavorites={this.changeFavorites}                
                favorites={favorites}                 
                updateFavorites={this.updateFavorites} 
                updateFilters={this.updateFilters}                 
              />} 
            /> 
            <Route path="/product-card-desktop/:id" 
              render={props => <ProductCardDesktop 
                {...props} 
                browsedProducts={browsedProducts}
                categories={categories} 
                changeFavorites={this.changeFavorites}                
                favorites={favorites}    
                favoritesIdList={favoritesIdList}              
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
                changeFavorites={this.changeFavorites}                
                favorites={favorites}  
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
