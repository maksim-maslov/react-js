import React, { Component } from 'react';

import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import Sorting from '../Sorting';
import Sidebar from '../Sidebar';
import ProductCatalogueItemList from '../ProductCatalogueItemList';
import Pagination from '../Pagination';
import BrowsedProducts from '../BrowsedProducts/BrowsedProducts';

const Search = () => {
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
          <ProductCatalogueItemList />                
          <Pagination />
        </section>
      </main>
      <BrowsedProducts />
    </div>
  );
}   

export default Search;