import './css/Catalogue.css';

import React, { Component } from 'react';

import { HashRouter, Route, Link, Nav, Switch } from 'react-router-dom';

import Breadcrumb from '../Breadcrumb/Breadcrumb';
import Sorting from '../Sorting/Sorting';
import Sidebar from './Sidebar';
import Pagination from '../Pagination/Pagination';
import BrowsedProducts from '../BrowsedProducts/BrowsedProducts';
import ProductCard from '../ProductCard/ProductCard';


class Catalogue extends Component {

  constructor(props) {
    super(props);

    this.title = '';
    this.state = {
      products: [],
      brands: []
    };

    this.getProducts = this.getProducts.bind(this);
    // this.updateFavorites = this.updateFavorites.bind(this);

    this.init(props);
  }

  componentWillReceiveProps(newProps) {
    this.init(newProps);    
  }

  init(newProps) {
    this.search = new URLSearchParams(newProps.history.location.search).get('search');
    this.categoryId = new URLSearchParams(newProps.history.location.search).get('categoryId');
    this.getProducts(1, newProps.brand);
  }

  getProducts(page = 1, newPropsBrand = '') {
    const { categories, filters } = this.props;
    let queryString = '';
    let filtersParams = '';

    for (let key in filters) {
      if (key == 'size' || key == 'heelSize') {
        filtersParams = filters[key].reduce((memo, el) => memo + `&${key}[]=${el}`, filtersParams);
      } else if (filters[key]) {
        filtersParams = `${filtersParams}&${key}=${filters[key]}`;
      } 
    }

    if (!this.search) {
      if (this.categoryId) {
        queryString = `categoryId=${this.categoryId}&page[]=${page}${filtersParams}`;
        this.title = categories.length && categories.find(el => el.id == this.categoryId).title;        
      } else {
        queryString = `discounted=true${filtersParams}`;
        this.title = 'Акции';
      }
    } else {
      queryString = `search=${this.search}`;
      this.title = 'Результаты поиска';
    }

    fetch(`https://api-neto.herokuapp.com/bosa-noga/products?${queryString}`)
    .then(response => response.json())
    .then(data => {
      
      this.setState({
        products: data
      });   

      if (this.state.brands == '' || filters.brand == newPropsBrand) {
        let brands = data.data.reduce((memo, el) => {
          memo[el.brand] = true;
          return memo;
        }, {});
        this.setState({
          brands: Object.keys(brands)
        });       
      }     

    });

  }

  // updateFavorites(event, id) {  
  //   event.preventDefault(); 
  //   this.props.updateFavorites(id);    
  // } 

  changeTextGoods(goods) {

    const lastSymbol = Number(String(goods).slice(-1));
    let result = 'Товар';

    if ((goods >= 11 && goods <= 14) || (lastSymbol >= 5 && lastSymbol <= 9) || lastSymbol == 0) {
      result = 'Товаров';
    } else if (lastSymbol >= 2 && lastSymbol <= 4) {
      result = 'Товара';
    } 
    
    return `${result}: ${goods}`;    
  }

  render() {
    
    const { products, brands } = this.state; 
    const { browsedProducts, favorites, favoritesIdList, updateFilters, filters, updateFavorites } = this.props;     
    
    return(
      <div>
        {products.status === 'ok' && favorites.data && 
          <div>
            <Breadcrumb links={[{link: '/main-page', text: 'Главная'}, {link: '/catalogue', text: `${this.title}`}]}/> 
            <main className="product-catalogue">            
              <Sidebar updateFilters={updateFilters} filters={filters} brands={brands} />            
              <section className="product-catalogue-content">                
                <section className="product-catalogue__head">
                  <div className="product-catalogue__section-title">
                    <h2 className="section-name">{this.title}</h2>
                    <span className="amount">
                     {`Товаров: ${products.goods}`}  
                    </span>
                  </div>
                  <Sorting updateFilters={updateFilters} />                    
                </section>            
                <section className="product-catalogue__item-list">
                  <ul className="product-catalogue__items">    
                    {products.data.map((el, index) => <ProductCard index={index} product={el} updateFavorites={updateFavorites} favoritesIdList={favoritesIdList} />)}
                  </ul>
                </section>              
                <Pagination 
                  pages={products.pages} 
                  page={products.page} 
                  changePage={this.getProducts} 
                />
              </section>
            </main>
            {
              browsedProducts.length 
              ? <BrowsedProducts browsedProducts={browsedProducts} />
              : ''
            }    
          </div>
        }
      </div>
    );
  }
}   

export default Catalogue;