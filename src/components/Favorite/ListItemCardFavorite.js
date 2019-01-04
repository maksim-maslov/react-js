import React, { Component } from 'react';

import { HashRouter, Route, Link, Nav, Switch } from 'react-router-dom';

class ListItemCardFavorite extends Component {
  constructor(props) {
    super(props);  
  }

  removeFavorites(event) {  
    event.preventDefault(); 
    const favorite = event.currentTarget.querySelector('.product-catalogue_favorite .product-catalogue__product_favorite p');    
    this.favoriteIdList = JSON.parse(localStorage.getItem('favorites'));
    const removeElementIndex = this.favoriteIdList.findIndex(el => el.id == event.currentTarget.dataset.id);    
    this.favoriteIdList.splice(removeElementIndex, 1);    
    localStorage.favorites = JSON.stringify(this.favoriteIdList);
    this.props.updateFavorites();    
  }

  render() {
    if (!this.props.list) {
      return false;
    }
    return this.props.list.map((el, index) => {
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
      )
    })
  }

  
}

export default ListItemCardFavorite;