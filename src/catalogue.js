import React, { Component } from 'react';

import Breadcrumbs from './components/Breadcrumbs/Breadcrumbs';
import Sorting from './components/Sorting';
import Sidebar from './components/Sidebar';
import ProductCatalogueItemList from './components/ProductCatalogueItemList';
import Pagination from './components/Pagination';
import BrowsedProducts from './components/BrowsedProducts/BrowsedProducts';

class Catalogue extends Component {

  constructor(props) {
    super(props);

    this.title = '';

    this.state = {
      products: []
    };
  }

  getProducts() {
    fetch(`https://neto-api.herokuapp.com/bosa-noga/products?categoryId=${this.categoryId}`)
      .then(response => response.json())
      .then(data => {this.setState({ products: data.data })});
    this.title = this.props.categories.find(el => el.id == this.categoryId)
    ? this.props.categories.find(el => el.id == this.categoryId).title
    : '';
  }
    
  componentDidMount() {
    this.categoryId = new URLSearchParams(this.props.history.location.search).get('categoryId');
    this.getProducts();
  }

  componentWillReceiveProps(newProps) {
    this.categoryId = new URLSearchParams(newProps.history.location.search).get('categoryId');
    this.getProducts();
  }

  render() {
    const products = this.state.products;   
    const title = this.title; 
    return(
      <div>  
        <Breadcrumbs links={[{link: '/main-page', text: 'Главная'}, {link: '/catalogue', text: 'Каталог'}]}/> 
        <main className="product-catalogue">            
          <Sidebar />            
          <section className="product-catalogue-content">                
            <section className="product-catalogue__head">
              <div className="product-catalogue__section-title">
                <h2 className="section-name">{title}</h2><span className="amount"> {products.length} товаров</span>
              </div>
              <Sorting />                    
            </section>            
            <ProductCatalogueItemList products={products} />            
            <Pagination />
          </section>
        </main>
        <BrowsedProducts />
      </div>
    );
  }
}   

export default Catalogue;