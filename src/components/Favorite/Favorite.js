import './css/Favorite.css';

import React, { Component } from 'react';

import { HashRouter, Route, Link, Nav, Switch } from 'react-router-dom';

import Breadcrumb from '../Breadcrumb/Breadcrumb';
import Sorting from '../Sorting/Sorting';
import Pagination from '../Pagination/Pagination';
import ProductCard from '../ProductCard/ProductCard';

class Favorite extends Component {
  constructor(props) {
    super(props);
    
    // this.changeFavorites = this.changeFavorites.bind(this);
  }

  // changeFavorites(event, id) {  
  //   event.preventDefault(); 
  //   this.props.changeFavorites(id);    
  // }

  changeTextGoods(goods) {

    const lastSymbol = Number(String(goods).slice(-1));
    let result = 'товар';

    if ((goods >= 11 && goods <= 14) || (lastSymbol >= 5 && lastSymbol <= 9) || lastSymbol == 0) {
      result = 'товаров';
    } else if (lastSymbol >= 2 && lastSymbol <= 4) {
      result = 'товара';
    } 
    
    return `${goods} ${result}`;    
  }
  
  render() {    
    const { favorites, updateFavorites, updateFilters } = this.props; 

    return(
      <div className="wrapper wrapper_favorite">
        {favorites.status === 'ok' &&  
        <div>
          <Breadcrumb links={[{link: "/main-page", text: "Главная"}, {link: "/favorite", text: "Избранное"}]} />
          <main className="product-catalogue_favorite">
            <section className="product-catalogue__head_favorite">
              <div className="product-catalogue__section-title">
                <h2 className="section-name">В вашем избранном</h2>
                <span className="amount amount_favorite"> 
                  {this.changeTextGoods(favorites.goods)} 
                </span>
              </div>
              <Sorting updateFilters={updateFilters} />
            </section>
            <section className="product-catalogue__item-list_favorite"> 
              <ul className="product-catalogue__items">    
                {favorites.data.map((el, index) => <ProductCard index={index} product={el} updateFavorites={updateFavorites} />
                  // return(
                  //   <li key={el.id} className="product-catalogue__item">
                  //     <Link to={`/product-card-desktop/${el.id}`} className="item-list__item-card item">
                  //       <div className="item-pic">
                  //         <img className={`item-pic-${index + 1}`} src={el.images[0]} alt={el.title}/>
                  //         <div className="product-catalogue__product_favorite">
                  //           <p onClick={ev => this.changeFavorites(ev, el.id)}></p>
                  //         </div>                    
                  //       </div>
                  //       <div className="item-desc">
                  //         <h4 className="item-name">{el.title}</h4>
                  //         <p className="item-producer">Производитель: <span className="producer">{el.brand}</span></p>
                  //         <p className="item-price">{el.price}</p>
                  //       </div>
                  //     </Link> 
                  //   </li>
                  // );
                )}  
              </ul> 
            </section> 
            <Pagination pages={favorites.pages} page={favorites.page} changePage={updateFavorites} />
          </main>
        </div>}
      </div>
    );
  }
  
}

export default Favorite;