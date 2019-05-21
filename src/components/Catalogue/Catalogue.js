import './css/Catalogue.css';

import Breadcrumb from '../Breadcrumb/Breadcrumb';
import BrowsedProducts from '../BrowsedProducts/BrowsedProducts';
import Loader from '../Loader/Loader';
import Pagination from '../Pagination/Pagination';
import ProductCard from '../ProductCard/ProductCard';
import Sorting from '../Sorting/Sorting';
import Sidebar from './Sidebar';

import React, { Component } from 'react';


class Catalogue extends Component {
  constructor(props) {
    super(props);

    this.title = '';
    this.categoryId = '';
    this.search = '';

    this.state = {
      products: [],
      brands: []
    };

    this.getProducts = this.getProducts.bind(this);    
  }


  componentDidMount() {
    this.init(this.props);
  }


  componentWillReceiveProps(newProps) {    
    this.init(newProps);    
  }


  init(newProps) {
    this.categoryId = new URLSearchParams(newProps.history.location.search).get('categoryId');

    this.search = new URLSearchParams(newProps.history.location.search).get('search');  

    this.props.categories.length && this.getProducts(1, newProps.brand);
  }


  getProducts(page = 1, newBrand = '') {
    const { categories, filters } = this.props;
    const { brands } = this.state;

    let queryString = '';
    let filtersParams = '';

    for (let key in filters) {

      if (key === 'size' || key === 'heelSize') {

        filtersParams = filters[key].reduce((memo, el) => memo + `&${key}[]=${el}`, filtersParams);
      } else if (filters[key]) {

        filtersParams = `${filtersParams}&${key}=${filters[key]}`;
      } 
    }

    if (this.search === null) {

      if (this.categoryId) {

        queryString = `categoryId=${this.categoryId}`;

        this.title = categories.find(el => el.id === Number(this.categoryId)).title; 
      } else {

        queryString = 'discounted=true';

        this.title = 'Акции';
      }
    } else {

      queryString = `search=${this.search}`;
      
      this.title = 'Результаты поиска';
    }

    queryString = queryString + `&page[]=${page}${filtersParams}`;

    fetch(`https://api-neto.herokuapp.com/bosa-noga/products?${queryString}`)
      .then(response => response.json())
      .then(data => {
      
        this.setState({products: data});   

        if (!brands.length || filters.brand === newBrand) {

          let brands = data.data.reduce((memo, el) => {

            memo[el.brand] = true;

            return memo;
          }, {});

          this.setState({brands: Object.keys(brands)});       
        }     
      });
  }


  render() {    
    const { 
      browsedProducts, 
      favoritesIdList, 
      filters, 
      updateFavorites, 
      updateFilters 
    } = this.props;     
    const { products, brands } = this.state; 
    
    
    return(
      <div>        
        {browsedProducts && products.status === 'ok'

        ? (
          <div>
            <Breadcrumb links={[{link: '/main-page', text: 'Главная'}, {link: '#', text: `${this.title}`}]} /> 

            <main className="product-catalogue"> 
              <Sidebar 
                brands={brands} 
                filters={filters}                                   
                updateFilters={updateFilters} 
              />  

              <section className="product-catalogue-content">  
                <section className="product-catalogue__head">
                  
                  <div className="product-catalogue__section-title">
                    <h2 className="section-name">{this.title}</h2>
                    <span className="amount">Товаров: {products.goods}</span>
                  </div>

                  <Sorting updateFilters={updateFilters} />  

                </section>       

                <section className="product-catalogue__item-list">
                  <ul className="product-catalogue__items"> 

                    {products.data.map((el, index) => {

                      return (
                        <ProductCard 
                          key={index}
                          favoritesIdList={favoritesIdList} 
                          index={index}  
                          product={el}                      
                          updateFavorites={updateFavorites}
                        />
                      );

                    })} 

                  </ul>
                </section>  

                <Pagination 
                  page={products.page}                   
                  pages={products.pages} 
                  changePage={this.getProducts} 
                />
              </section>
            </main>

            {browsedProducts.length ? <BrowsedProducts browsedProducts={browsedProducts} /> : ''} 

          </div>
        )

        : <Loader />
        }
      </div>
    );
  }
}   

export default Catalogue;