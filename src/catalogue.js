import React, { Component } from 'react';

import Breadcrumbs from './components/Breadcrumbs';
import Sorting from './components/Sorting';
import Sidebar from './components/Sidebar';
import ProductCatalogueItemList from './components/ProductCatalogueItemList';
import Pagination from './components/Pagination';
import BrowsedProducts from './components/BrowsedProducts';


class Catalogue extends Component {

  constructor(props) {
    super(props);
    this.categoryId = props.history.location.search;
    console.log(props)

    this.state = {
      products: []
    };
  }
    
  componentDidMount() {
    fetch(`https://api-neto.herokuapp.com/bosa-noga/products${this.categoryId}`)
      .then(response => response.json())
      .then(data => {this.setState({ products: data.data })});
  }

  render() {
    const {products} = this.state;    
    return(
      <div>  
        <Breadcrumbs links={[{link: "/main-page", text: "Главная"}, {link: "/catalogue", text: "Каталог"}]}/> 
        <main className="product-catalogue">            
          <Sidebar />            
          <section className="product-catalogue-content">                
            <section className="product-catalogue__head">
              <div className="product-catalogue__section-title">
                <h2 className="section-name">Женская обувь</h2><span className="amount"> 1 764 товара</span>
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