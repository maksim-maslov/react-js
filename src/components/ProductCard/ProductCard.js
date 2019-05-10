import './css/ProductCard.css';

import React, { Component } from 'react';

import { HashRouter, Route, Link, Nav, NavLink, Switch } from 'react-router-dom';

const ProductCard = ({ index, product, updateFavorites, favoritesIdList }) => {

  let classNameFavorite = 'item-pic-favorite__like_favorites';

  if (favoritesIdList) {
    classNameFavorite = favoritesIdList.findIndex(element => element.id == product.id) === -1 ? 'item-pic-favorite__like_not-favorites' : 'item-pic-favorite__like_not-favorites-choosen';
  }

  const handlerClick = (event, id) => {
    event.preventDefault(); 
    updateFavorites(id);    
  }

  return(
    <li key={product.id} className="product-catalogue__item">
      <Link to={`/product-card-desktop/${product.id}`} className="item-list__item-card item">
        <div className="item-pic">
          <img className={`item-pic-${index + 1}`} src={product.images[0]} alt={product.title}/>
          <div className="item-pic__favorite">          
            <p 
              className={`item-pic-favorite__like ${classNameFavorite}`}
              onClick={ev => handlerClick(ev, product.id)}
            ></p>
          </div>                    
        </div>
        <div className="item-desc">
          <h4 className="item-name">{product.title}</h4>
          <p className="item-producer"><span className="producer">{product.brand}</span></p>
          <p className="item-price">{product.price}</p>
        </div>
      </Link> 
    </li>
  );    
}

export default ProductCard;