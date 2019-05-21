import './css/Favorite.css';

import Breadcrumb from '../Breadcrumb/Breadcrumb';
import Pagination from '../Pagination/Pagination';
import ProductCard from '../ProductCard/ProductCard';
import Sorting from '../Sorting/Sorting';

import React from 'react';


function Favorite({ favorites, updateFavorites, updateFilters }) {

  function declOfNum(number, titles) {  
    let cases = [2, 0, 1, 1, 1, 2];  
    return `${number} ${titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]]}`;  
  }
  
  return(
    <div className="wrapper wrapper_favorite">
      <div>
        <Breadcrumb links={[{link: "/main-page", text: "Главная"}, {link: "#", text: "Избранное"}]} />
        <main className="product-catalogue_favorite">
          <section className="product-catalogue__head_favorite">
            <div className="product-catalogue__section-title">
              <h2 className="section-name">В вашем избранном</h2>
              <span className="amount amount_favorite"> 
                {declOfNum(Number(favorites.goods), ['товар', 'товара', 'товаров'])} 
              </span>
            </div>
            <Sorting updateFilters={updateFilters} />
          </section>
          <section className="product-catalogue__item-list_favorite"> 
            <ul className="product-catalogue__items">    
              {favorites.data.map((el, index) => {
                return (
                  <ProductCard 
                    index={index} 
                    product={el} 
                    updateFavorites={updateFavorites} 
                  />
                );
              })}  
            </ul> 
          </section> 
          <Pagination 
            page={favorites.page}             
            pages={favorites.pages} 
            changePage={updateFavorites} 
          />
        </main>
      </div>
    </div>
  );  
}

export default Favorite;