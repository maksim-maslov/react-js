import React, { Component } from 'react';

import { HashRouter, Route, Link, Nav, Switch } from 'react-router-dom';

import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import Sorting from '../Sorting';
import Sidebar from '../Sidebar';
import ProductCatalogueItemList from '../ProductCatalogueItemList';
import Pagination from '../Pagination';
import BrowsedProducts from '../BrowsedProducts/BrowsedProducts';

class Catalogue extends Component {

  constructor(props) {
    super(props);

    this.title = '';
    this.categoryId = '';
    this.page = '';
    this.state = {
      products: [],
      favoriteIdList: localStorage.getItem('favorites') ? JSON.parse(localStorage.getItem('favorites')) : []
    };

  }

  componentDidMount() {
    this.categoryId = new URLSearchParams(this.props.history.location.search).get('categoryId');
    this.page = new URLSearchParams(this.props.history.location.search).get('page[]');
    this.getProducts();
  }

  componentWillReceiveProps(newProps) {
    this.categoryId = new URLSearchParams(newProps.history.location.search).get('categoryId');
    this.page = new URLSearchParams(this.props.history.location.search).get('page[]');
    this.getProducts();
  }

  getProducts() {
    let queryString;
    let filters = '';
    // console.log('this.props.filters', this.props.filters)
    for (let key in this.props.filters) {
      // console.log('this.props.filters[key]', `&${key}=${this.props.filters[key]}`)
      if (key == 'size[]' || key == 'heelSize[]') {
        filters = this.props.filters[key].reduce((memo, el) => {
          memo = memo + `&${key}=${el}`;
          return memo;
        }, filters);
        // filters = `${filters}&${key}=${this.props.filters[key]}`;  
      } else {
        filters = `${filters}&${key}=${this.props.filters[key]}`;
      }
      
    }
    // console.log('this.filters', filters)
    if (this.categoryId) {
      queryString = `categoryId=${this.categoryId}&page[]=${this.page ? this.page : 1}${filters}`;
      this.title = this.props.categories.find(el => el.id == this.categoryId)
      ? this.props.categories.find(el => el.id == this.categoryId).title
      : '';
    } else {
      queryString = `discounted=true${filters}`;
      this.title = 'Акции'
    }
    fetch(`https://neto-api.herokuapp.com/bosa-noga/products?${queryString}`)
      .then(response => response.json())
      .then(data => {this.setState({ products: data })});    
    // console.log('state', this.state)
  }

  removeFavorites(event) {  

    event.preventDefault(); 
    const favorite = event.target;
    const favoriteIdList = this.state.favoriteIdList;

    if (favorite.classList.contains('favourite_chosen')) {
      const removeElementIndex = favoriteIdList.findIndex(el => el.id == event.currentTarget.dataset.id);
      favoriteIdList.splice(removeElementIndex, 1);
      favorite.classList.remove('favourite_chosen');
    } else {
      favoriteIdList.push({id: event.currentTarget.dataset.id});
      favorite.classList.add('favourite_chosen');
    }

    localStorage.favorites = JSON.stringify(favoriteIdList);

    this.state = {
      favoriteIdList: localStorage.getItem('favorites') ? JSON.parse(localStorage.getItem('favorites')) : []
    };

    this.props.updateFavorites();
    
  } 

  render() {
    const products = this.state.products;  
    // const title = this.title;
    // console.log('products1', products)

    return(
      <div>
        {products.status === 'ok' &&  <div>
          <Breadcrumbs links={[{link: '/main-page', text: 'Главная'}, {link: '/catalogue', text: 'Каталог'}]}/> 
          <main className="product-catalogue">            
            <Sidebar updateFilters={this.props.updateFilters} />            
            <section className="product-catalogue-content">                
              <section className="product-catalogue__head">
                <div className="product-catalogue__section-title">
                  <h2 className="section-name">{this.title}</h2><span className="amount"> {products.goods} товаров</span>
                </div>
                <Sorting />                    
              </section>            
              {/* <ProductCatalogueItemList products={products.data} updateFavorites={this.props.updateFavorites} />   */}
              <section className="product-catalogue__item-list product-catalogue__item-list_favorite">
                {/* <ListItemCard list={this.props.products} updateFavorites={this.props.updateFavorites} /> */}
                {/* {console.log('13255947040', products)} */}
                {products.data.map((el, index) => {
                  return(
                    <Link to={`/product-card-desktop/${el.id}`} className="item-list__item-card item">
                      <div className="item-pic"><img className={`item-pic-${index + 1}`} src={el.images[0]} alt={el.title}/>
                        <div className="product-catalogue__product_favorite">
                          <p className={this.state.favoriteIdList.findIndex(element => element.id == el.id) === -1 ? '' : 'favourite_chosen'} data-id={el.id} onClick={this.removeFavorites.bind(this)} ></p>
                        </div>
                        <div className="arrow arrow_left"></div>
                        <div className="arrow arrow_right"></div>
                      </div>
                      <div className="item-desc">
                        <h4 className="item-name">{el.title}</h4>
                        <p className="item-producer">Производитель: <span className="producer">{el.brand}</span></p>
                        <p className="item-price">{el.price}</p>
                        <div className="sizes">
                        <p className="sizes__title">Размеры в наличии:</p>
                        <p className="sizes__avalible">36, 37, 38, 39, 40, 41, 42</p>
                        </div>
                      </div>
                    </Link>            
                  );
                })}
              </section>              
              <Pagination pages={products.pages} page={products.page} search={`/catalogue?categoryId=${this.categoryId}`} />
            </section>
          </main>
          <BrowsedProducts browsedProducts={this.props.browsedProducts} />
        </div>}
      </div>
    );
  }
}   

export default Catalogue;