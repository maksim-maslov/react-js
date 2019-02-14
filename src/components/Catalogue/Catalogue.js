import React, { Component } from 'react';

import { HashRouter, Route, Link, Nav, Switch } from 'react-router-dom';

import Breadcrumb from '../Breadcrumb/Breadcrumb';
import Sorting from '../Sorting/Sorting';
import Sidebar from './Sidebar';
import Pagination from '../Pagination/Pagination';
import BrowsedProducts from '../BrowsedProducts/BrowsedProducts';

class Catalogue extends Component {

  constructor(props) {
    super(props);

    this.title = '';
    this.state = {
      products: []
    };
    this.getProducts = this.getProducts.bind(this);

    this.init(props);
  }

  componentWillReceiveProps(newProps) {
    this.init(newProps);    
  }

  init(props) {
    this.search = new URLSearchParams(props.history.location.search).get('search');
    this.categoryId = new URLSearchParams(props.history.location.search).get('categoryId');
    this.getProducts();
  }

  getProducts(page = 1) {
    const { categories, filters } = this.props;
    let queryString = '';
    let filtersParams = '';

    for (let key in filters) {
      filtersParams = (key == 'size[]' || key == 'heelSize[]')
      ? filters[key].reduce((memo, el) => memo + `&${key}=${el}`, filters)
      : `${filters}&${key}=${filters[key]}`;     
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
      .then(data => this.setState({products: data}));  

  }

  changeFavorites(event) {  
    event.preventDefault(); 
    this.props.changeFavorites(event.currentTarget.dataset.id);    
  } 

  render() {
    const { products } = this.state; 
    const { browsedProducts, favorites, favoritesIdList, updateFilters } = this.props;
    
    return(
      <div>
        {products.status === 'ok' && favorites.data && 
          <div>
            <Breadcrumb links={[{link: '/main-page', text: 'Главная'}, {link: '/catalogue', text: `${this.title}`}]}/> 
            <main className="product-catalogue">            
              <Sidebar updateFilters={updateFilters} />            
              <section className="product-catalogue-content">                
                <section className="product-catalogue__head">
                  <div className="product-catalogue__section-title">
                    <h2 className="section-name">{this.title}</h2><span className="amount"> {products.goods} товаров</span>
                  </div>
                  <Sorting updateFilters={updateFilters} />                    
                </section>            
                <section className="product-catalogue__item-list product-catalogue__item-list_favorite">
                  {products.data.map((el, index) => {
                    return(
                      <Link to={`/product-card-desktop/${el.id}`} className="item-list__item-card item">
                        <div className="item-pic"><img className={`item-pic-${index + 1}`} src={el.images[0]} alt={el.title}/>
                          <div className="product-catalogue__product_favorite">
                            <p className={favoritesIdList.findIndex(element => element.id == el.id) === -1 ? '' : 'favourite_chosen'} data-id={el.id} onClick={this.changeFavorites.bind(this)} ></p>
                          </div>
                        </div>
                        <div className="item-desc">
                          <h4 className="item-name">{el.title}</h4>
                          <p className="item-producer">Производитель: <span className="producer">{el.brand}</span></p>
                          <p className="item-price">{el.price}</p>
                        </div>
                      </Link>            
                    );
                  })}
                </section>              
                <Pagination pages={products.pages} page={products.page} changePage={this.getProducts} />
              </section>
            </main>
            {browsedProducts.length != 0 && <BrowsedProducts browsedProducts={browsedProducts} />}    
          </div>
        }
      </div>
    );
  }
}   

export default Catalogue;