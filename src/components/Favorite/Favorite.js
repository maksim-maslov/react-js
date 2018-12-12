import React, { Component } from 'react';

import { HashRouter, Route, Link, Nav, Switch } from 'react-router-dom';

import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import Sorting from '../Sorting';
import ProductCatalogueItemListFavorite from './ProductCatalogueItemListFavorite';
import Pagination from '../Pagination';

class Favorite extends Component {
  constructor(props) {
    super(props);

    console.log('1234567s', props);

    this.state = {queryString: ''}; 

  }


  removeFavorites(event) {  
    event.preventDefault(); 
    const favorite = event.currentTarget.querySelector('.product-catalogue_favorite .product-catalogue__product_favorite p');
    // const favoritePic = event.currentTarget.querySelector('.favourite');
    // this.favoriteIdList = JSON.parse(localStorage.getItem('favorites'));
    // console.log(this.favoriteIdList);
    // this.favoriteIdList.shift();
    
    // if (!this.state.isFavorite) {
    //   console.log(this.favoriteIdList)
    //   this.favoriteIdList.push({id: this.props.product.id});
    //   localStorage.favorites = JSON.stringify(this.favoriteIdList);
    //   this.setState({isFavorite: !this.state.isFavorite});
    //   favoritePic.classList.add('favourite_chosen');
    //   // favorite.textContent = 'В избранном';
    // } else {
      this.favoriteIdList = JSON.parse(localStorage.getItem('favorites'));
      const removeElementIndex = this.favoriteIdList.findIndex(el => el.id == event.currentTarget.dataset.id);
      // console.log('tyetytre', this.favoriteIdList, removeElementIndex, event.currentTarget.dataset.id)
      // console.log('56575', this.favoriteIdList)
      this.favoriteIdList.splice(removeElementIndex, 1);
      // console.log('56576', this.favoriteIdList)
      // this.state = {      
      //   favorites: this.favoriteIdList
      // };
      localStorage.favorites = JSON.stringify(this.favoriteIdList);
      // favorite.textContent = 'В избранное';
      // this.setState({ isFavorite: !this.state.isFavorite });
      // favoritePic.classList.remove('favourite_chosen');
    // }
    this.props.updateFavorites();
    // this.props.joinProductIdsToQueryString(this.favoriteIdList)
    //   .then(queryString => this.setState({queryString: queryString}))
    
    // favorite.textContent = favorite.textContent === 'В избранное' ? 'В избранном' : 'В избранное';
  }


  
  
  render() {
    
    const favorites = this.props.favorites;  
    // console.log('1', favorites)
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
                      <p data-id={el.id} onClick={this.removeFavorites.bind(this)} ></p>
                    </div>
                    <div className="arrow arrow_left"></div>
                    <div className="arrow arrow_right"></div>
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
          
          <Pagination pages={favorites.pages} page={favorites.page} search={`/products?${this.state.queryString}`} />
        </main>
        </div>}
      </div>
    );
  }
  
}

export default Favorite;