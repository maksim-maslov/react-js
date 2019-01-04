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

    this.state = {
      productsInBasket: [],
      categories: [],
      favorites: {},
      browsedProducts: [],
      filters: {}
    };
  }


  componentDidMount() {              
    const cartId = localStorage.cartId;
    if (cartId) {
      const params = {method: 'GET'};
      this.getProductsInBasket(`https://neto-api.herokuapp.com/bosa-noga/cart/${cartId}`, params);      
    } 
    this.getCategories();
    this.updateFavorites();
    this.updateBrowsedProducts();
  } 

  changeFavorites(productId) {
    const favoriteIdList = JSON.parse(localStorage.favorites);
    const removeElementIndex = favoriteIdList.findIndex(el => el.id == productId);
    if (removeElementIndex != -1) {
      favoriteIdList.splice(removeElementIndex, 1);      
    } else {
      favoriteIdList.push({id: productId});      
    }
    localStorage.favorites = JSON.stringify(favoriteIdList);
    this.updateFavorites();
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

  updateFavorites(page = 1) {  
    const favoriteIdList = localStorage.favorites 
    ? JSON.parse(localStorage.favorites) 
    : [];

    if (favoriteIdList.length === 0) {
      this.setState({ favorites: [] });         
    } else {
      this.joinProductIdsToQueryString(favoriteIdList)
        .then(queryString => {
          if (this.state.filters.sortBy) {
            queryString = queryString + `&sortBy=${this.state.filters.sortBy}`;
          }          
          return fetch(`http://api-neto.herokuapp.com/bosa-noga/products?${queryString}&page[]=${page}`)
        })
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
            productArray = data.data.products; 
            return productArray;                  
          } else {
            localStorage.cartId = data.data.id;
            productArray = product;
            return productArray;                     
          }          
        } 
        else {
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
    const browsedProducts = localStorage.browsedProducts 
    ? JSON.parse(localStorage.browsedProducts) 
    : [];

    if (browsedProducts.length === 0) {
      this.setState({ browsedProducts: [] });         
    } else {
      this.joinProductIdsToQueryString(browsedProducts)
        .then(queryString => fetch(`http://api-neto.herokuapp.com/bosa-noga/products?${queryString}`))
        .then(response => response.json())
        .then(data => {
          if (data) {
            this.setState({ browsedProducts: data.data }); 

          }
        });
    }
  }

  updateFilters(event) {

    let filters = this.state.filters;

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
    return (
      <HashRouter>
        <div className="container">
          <Header 
            categories={this.state.categories} 
            productsInBasket={this.state.productsInBasket} 
            updateBasket={this.updateBasket.bind(this)}            
          />          
          <Switch>
            <Route path="/catalogue" 
              render={props => <Catalogue 
                {...props} 
                browsedProducts={this.state.browsedProducts} 
                categories={this.state.categories}                 
                favorites={this.state.favorites}                 
                filters={this.state.filters}
                changeFavorites={this.changeFavorites.bind(this)}
                updateFilters={this.updateFilters.bind(this)} 
              />} 
            />
            <Route path="/favorite" 
              render={props => <Favorite 
                {...props} 
                favorites={this.state.favorites} 
                changeFavorites={this.changeFavorites.bind(this)}
                updateFavorites={this.updateFavorites.bind(this)} 
                updateFilters={this.updateFilters.bind(this)}                 
              />} 
            /> 
            <Route path="/product-card-desktop/:id" 
              render={props => <ProductCardDesktop 
                {...props} 
                browsedProducts={this.state.browsedProducts}
                categories={this.state.categories} 
                favorites={this.state.favorites}                  
                changeFavorites={this.changeFavorites.bind(this)}
                updateBasket={this.updateBasket.bind(this)} 
                updateBrowsedProducts={this.updateBrowsedProducts.bind(this)} 
              />} 
            />
            <Route path="/order" 
              render={props => <Order 
                {...props} 
                categories={this.state.categories}                 
                productsInBasket={this.state.productsInBasket} 
                updateBasket={this.updateBasket.bind(this)} 
              />} 
            />
            <Route path="/order-done" component={OrderDone} />
            {/* <Route path="/search" component={Search} /> */}
            <Route path="/" 
              render={props => <MainPage 
                {...props} 
                categories={this.state.categories} 
                favorites={this.state.favorites}                 
                changeFavorites={this.changeFavorites.bind(this)}
                updateFavorites={this.updateFavorites.bind(this)}                 
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
