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
      browsedProducts: [],
      filters: {}
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

  // componentWillUpdate() {
  //   this.updateFavorites();
  // }


  joinProductIdsToQueryString(products = []) {
    return new Promise((done, fail) => {
      const queryString = products.reduce((memo, el) => {
        // console.log('el', el)
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
        .then(queryString => {
          console.log('filters', this.state)
          if (this.state.filters.sortBy) {
            queryString = queryString + `&sortBy=${this.state.filters.sortBy}`;
          }

          return fetch(`http://api-neto.herokuapp.com/bosa-noga/products?${queryString}`)
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

    // console.log('browsedProducts1478234729', browsedProducts)

    if (browsedProducts.length === 0) {
      this.setState({ browsedProducts: [] });         
    } else {
      this.joinProductIdsToQueryString(browsedProducts)
        .then(queryString => fetch(`http://api-neto.herokuapp.com/bosa-noga/products?${queryString}`))
        .then(response => response.json())
        .then(data => {
          // console.log('6875394058908940', data)
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
      // console.log('size', event.target)
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
        // console.log('size1', size)
        filters['size[]'] = [];
        filters['size[]'].push(size);
      }

    } else if (event.currentTarget.classList.contains('sidebar__heel-height')) {

      const heelSize = event.target.value;
      // console.log('size', event.target)
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
        // console.log('size1', heelSize)
        filters['heelSize[]'] = [];
        filters['heelSize[]'].push(heelSize);
      }

    } else if (event.currentTarget.classList.contains('checkbox-discount')) {
      // console.log('event.currentTarget', filters)
      filters.hasOwnProperty('discounted')
      ? delete filters['discounted']
      : filters.discounted = 'true'; 
    } else {

      event.preventDefault();

      // console.log(event.currentTarget)
      
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
        // console.log('Array', Array.from(filters));
        for (let key in filters) {
          delete filters[key];
        } 
        const checkboxes = document.querySelectorAll(`.sidebar [type="checkbox"]`);
        // console.log('checkboxes', checkboxes)
        Array.from(checkboxes).forEach(el => el.checked = false);
        const search = document.querySelector(`.sidebar [name="search"]`);
        // console.log('search', search)
        search.value = '';
      }

    }

    

    // console.log('event.currentTarget', event.currentTarget)

    // // if (event.currentTarget.classList.contains('checkbox-discount')) {
    // //   console.log('event.currentTarget', filters)
    // //   filters.hasOwnProperty('discounted')
    // //   ? delete filters['discounted']
    // //   : filters.discounted = 'true';
    // // }

    

    
    
    // filters.push(event.target.textContent);
    this.setState({
      filters: filters
    });

    // console.log('this.state.filters', event.currentTarget, this.state.filters)
  }

  render() {
    const productsInBasket = this.state.productsInBasket;
    // console.log(localStorage);
    // console.log(this.state.browsedProducts)

    return (
      <HashRouter>
        <div className="container">
          <Header 
            productsInBasket={productsInBasket} 
            updateBasket={this.updateBasket.bind(this)} 
            categories={this.state.categories} 
          />          
          <Switch>
            <Route path="/catalogue" 
              render={(props) => <Catalogue 
                {...props} 
                updateFavorites={this.updateFavorites.bind(this)} 
                categories={this.state.categories} 
                browsedProducts={this.state.browsedProducts} 
                updateFilters={this.updateFilters.bind(this)}
                filters={this.state.filters}
              />} 
            />
            <Route path="/favorite" 
              render={(props) => <Favorite 
                {...props} 
                favorites={this.state.favorites} 
                updateFavorites={this.updateFavorites.bind(this)} 
                joinProductIdsToQueryString={this.joinProductIdsToQueryString.bind(this)}
                updateFilters={this.updateFilters.bind(this)} 
              />} 
            /> 
            <Route path="/product-card-desktop/:id" 
              render={(props) => <ProductCardDesktop 
                {...props} 
                updateBasket={this.updateBasket.bind(this)} 
                updateFavorites={this.updateFavorites.bind(this)} 
                updateBrowsedProducts={this.updateBrowsedProducts.bind(this)} 
                categories={this.state.categories} 
                browsedProducts={this.state.browsedProducts} 
              />} 
            />
            <Route path="/order" 
              render={(props) => <Order 
                {...props} 
                productsInBasket={productsInBasket} 
                updateBasket={this.updateBasket.bind(this)} 
                categories={this.state.categories} 
              />} 
            />
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
