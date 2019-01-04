import React, { Component } from 'react';

import { HashRouter, Route, Link, Nav, Switch } from 'react-router-dom';

import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import Sorting from '../Sorting';
import ProductCatalogueItemListFavorite from './ProductCatalogueItemListFavorite';
import Pagination from '../Pagination/Pagination';

class Favorite extends Component {
  constructor(props) {
    super(props);

  }

  changeFavorites(event) {  
    event.preventDefault(); 
    this.props.changeFavorites(event.currentTarget.dataset.id);    
  }
  
  render() {
    console.log(this)
    
    const favorites = this.props.favorites;  

    return(
      <div className="wrapper wrapper_favorite">
        {favorites.status === 'ok' &&  <div>
        <Breadcrumbs links={[{link: "/main-page", text: "Главная"}, {link: "/favorite", text: "Избранное"}]} />
        <main className="product-catalogue product-catalogue_favorite">
          <section className="product-catalogue__head product-catalogue__head_favorite">
            <div className="product-catalogue__section-title">
              <h2 className="section-name">В вашем избранном</h2><span className="amount amount_favorite"> {favorites.goods} товаров</span>
            </div>
            <Sorting updateFilters={this.props.updateFilters} />
          </section>

          {/* <ProductCatalogueItemListFavorite favorites={props.favorites} updateFavorites={props.updateFavorites} />         */}
          <section className="product-catalogue__item-list product-catalogue__item-list_favorite">  
            {/* <ListItemCardFavorite list={favorites} updateFavorites={this.props.updateFavorites} /> */}        

            {favorites.data.map((el, index) => {
              return(
                <Link to={`/product-card-desktop/${el.id}`} className="item-list__item-card item">
                  <div className="item-pic"><img className={`item-pic-${index + 1}`} src={el.images[0]} alt={el.title}/>
                    <div className="product-catalogue__product_favorite">
                      <p data-id={el.id} onClick={this.changeFavorites.bind(this)} ></p>
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
          
          <Pagination pages={favorites.pages} page={favorites.page} nextPage={this.props.updateFavorites} />
        </main>
        </div>}
      </div>
    );
  }
  
}

export default Favorite;