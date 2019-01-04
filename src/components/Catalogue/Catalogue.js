import React, { Component } from 'react';

import { HashRouter, Route, Link, Nav, Switch } from 'react-router-dom';

import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import Sorting from '../Sorting';
import Sidebar from './Sidebar';
import ProductCatalogueItemList from './ProductCatalogueItemList';
import Pagination from '../Pagination/Pagination';
import BrowsedProducts from '../BrowsedProducts/BrowsedProducts';

class Catalogue extends Component {

  constructor(props) {
    super(props);

    this.title = '';
    this.categoryId = '';
    // this.page = '';
    this.state = {
      products: []
    };

  }

  componentDidMount() {
    this.search = new URLSearchParams(this.props.history.location.search).get('search');    
    this.categoryId = new URLSearchParams(this.props.history.location.search).get('categoryId');
    // this.page = new URLSearchParams(this.props.history.location.search).get('page[]');
    this.getProducts();
  }

  componentWillReceiveProps(newProps) {
    this.search = new URLSearchParams(newProps.history.location.search).get('search');
    this.categoryId = new URLSearchParams(newProps.history.location.search).get('categoryId');
    // this.page = new URLSearchParams(this.props.history.location.search).get('page[]');
    this.getProducts();
  }

  getProducts(page = 1) {

    let queryString;
    let filters = '';

    for (let key in this.props.filters) {
      if (key == 'size[]' || key == 'heelSize[]') {

        filters = this.props.filters[key].reduce((memo, el) => {
          memo = memo + `&${key}=${el}`;
          return memo;
        }, filters);

      } else {
        filters = `${filters}&${key}=${this.props.filters[key]}`;
      }      
    }
    if (!this.search) {
      if (this.categoryId) {
        queryString = `categoryId=${this.categoryId}&page[]=${page}${filters}`;
        this.title = this.props.categories.find(el => el.id == this.categoryId)
        ? this.props.categories.find(el => el.id == this.categoryId).title
        : '';
      } else {
        queryString = `discounted=true${filters}`;
        this.title = 'Акции';
      }
    } else {
      queryString = `search=${this.search}`;
      this.title = 'Результаты поиска';
    }

    fetch(`https://neto-api.herokuapp.com/bosa-noga/products?${queryString}`)
      .then(response => response.json())
      .then(data => {this.setState({ products: data })});  

  }

  changeFavorites(event) {  
    event.preventDefault(); 
    this.props.changeFavorites(event.currentTarget.dataset.id);    
  } 

  render() {
    const products = this.state.products;  
    
    return(
      <div>
        {products.status === 'ok' && this.props.favorites.data && <div>
          <Breadcrumbs links={[{link: '/main-page', text: 'Главная'}, {link: '/catalogue', text: `${this.title}`}]}/> 
          <main className="product-catalogue">            
            <Sidebar updateFilters={this.props.updateFilters} />            
            <section className="product-catalogue-content">                
              <section className="product-catalogue__head">
                <div className="product-catalogue__section-title">
                  <h2 className="section-name">{this.title}</h2><span className="amount"> {products.goods} товаров</span>
                </div>
                <Sorting updateFilters={this.props.updateFilters} />                    
              </section>            
              {/* <ProductCatalogueItemList products={products.data} updateFavorites={this.props.updateFavorites} />   */}
              <section className="product-catalogue__item-list product-catalogue__item-list_favorite">
                {/* <ListItemCard list={this.props.products} updateFavorites={this.props.updateFavorites} /> */}
                {products.data.map((el, index) => {
                  return(
                    <Link to={`/product-card-desktop/${el.id}`} className="item-list__item-card item">
                      <div className="item-pic"><img className={`item-pic-${index + 1}`} src={el.images[0]} alt={el.title}/>
                        <div className="product-catalogue__product_favorite">
                          <p className={this.props.favorites.data.findIndex(element => element.id == el.id) === -1 ? '' : 'favourite_chosen'} data-id={el.id} onClick={this.changeFavorites.bind(this)} ></p>
                        </div>
                        {/* <div className="arrow arrow_left"></div>
                        <div className="arrow arrow_right"></div> */}
                      </div>
                      <div className="item-desc">
                        <h4 className="item-name">{el.title}</h4>
                        <p className="item-producer">Производитель: <span className="producer">{el.brand}</span></p>
                        <p className="item-price">{el.price}</p>
                        {/* <div className="sizes">
                        <p className="sizes__title">Размеры в наличии:</p>
                        <p className="sizes__avalible">36, 37, 38, 39, 40, 41, 42</p>
                        </div> */}
                      </div>
                    </Link>            
                  );
                })}
              </section>              
              <Pagination pages={products.pages} page={products.page} nextPage={this.getProducts.bind(this)} />
            </section>
          </main>
          <BrowsedProducts browsedProducts={this.props.browsedProducts} />
        </div>}
      </div>
    );
  }
}   

export default Catalogue;