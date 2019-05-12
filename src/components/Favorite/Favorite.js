import './css/Favorite.css';

import Breadcrumb from '../Breadcrumb/Breadcrumb';
import Pagination from '../Pagination/Pagination';
import ProductCard from '../ProductCard/ProductCard';
import Sorting from '../Sorting/Sorting';

import React from 'react';


const Favorite = ({ favorites, updateFavorites, updateFilters }) => {

  const changeTextGoods = goods => {
    const lastSymbol = Number(String(goods).slice(-1));
    let result = 'товар';

    if ((goods >= 11 && goods <= 14) || (lastSymbol >= 5 && lastSymbol <= 9) || lastSymbol == 0) {
      result = 'товаров';
    } else if (lastSymbol >= 2 && lastSymbol <= 4) {
      result = 'товара';
    } 
    
    return `${goods} ${result}`;    
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
                {changeTextGoods(favorites.goods)} 
              </span>
            </div>
            <Sorting updateFilters={updateFilters} />
          </section>
          <section className="product-catalogue__item-list_favorite"> 
            <ul className="product-catalogue__items">    
              {favorites.data.map((el, index) => <ProductCard index={index} product={el} updateFavorites={updateFavorites} />)}  
            </ul> 
          </section> 
          <Pagination pages={favorites.pages} page={favorites.page} changePage={updateFavorites} />
        </main>
      </div>
    </div>
  );  
}

export default Favorite;