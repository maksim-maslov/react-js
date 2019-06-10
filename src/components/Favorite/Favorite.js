import './css/Favorite.css';

import Breadcrumb from '../Breadcrumb/Breadcrumb';
import Pagination from '../Pagination/Pagination';
import ProductCard from '../ProductCard/ProductCard';
import Sorting from '../Sorting/Sorting';

import React from 'react';


function Favorite({ favorites, getFavorites, updateFavorites, updateFilters }) {

  function declOfNum(number, titles) {  
    let cases = [2, 0, 1, 1, 1, 2];  
    return `${number} ${titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]]}`;  
  }
  
  return (
    <div className="wrapper wrapper_favorite">
      <Breadcrumb links={[{link: "/main-page", text: "Главная"}, {link: "#", text: "Избранное"}]} />
      <main className="favorite">
        <section className="favorite__head">
          <div className="favorite-head__title">
            <h2 className="favorite-head-title__text">В вашем избранном</h2>
            <span className="favorite-head-title__amount"> 
              {declOfNum(Number(favorites.goods), ['товар', 'товара', 'товаров'])} 
            </span>
          </div>
          <Sorting updateFilters={updateFilters} />
        </section>
        <section className="favorite__item-list"> 
          <ul className="favorite-item-list__items">    
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
          changePage={getFavorites} 
        />
      </main>
    </div>
  );  
}

export default Favorite;