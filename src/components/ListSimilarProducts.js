import React, { Component } from 'react';

import { HashRouter, Route, Link, Nav, NavLink, Switch } from 'react-router-dom';

const ListSimilarProducts = ({list = []}) => {
  return list.map((el, index) => {
    return(
      <div className="similar-products-slider__item-list__item-card item">
        <div className="similar-products-slider__item">
          <NavLink to="/product-card-desktop">
            <img src={require(`../img/product-card-pics/product-card__similar-products-slider-item-${index + 1}.png`)} className={`similar-products-slider__item-pic-${index + 1}`} alt={el.title}/>
          </NavLink>
        </div>
        <div className="similar-products-slider__item-desc">
          <h4 className="similar-products-slider__item-name">{el.title}</h4>
          <p className="similar-products-slider__item-producer">Производитель: <span className="producer">{el.brand}</span></p>
          <p className="similar-products-slider__item-price">{el.price}</p>
        </div>    
      </div>                  
    )
  })    
}

export default ListSimilarProducts;