import React, { Component } from 'react';

import { HashRouter, Route, Link, Nav, Switch } from 'react-router-dom';

const ListSimilarProducts = ({list = []}) => {
  return list.map((el, index) => {
    return(index < 3 &&
      <div className="similar-products-slider__item-list__item-card item">
        <div className="similar-products-slider__item">
          <Link to={`/product-card-desktop/${el.id}`}>
            <img src={el.images[0]} className={`similar-products-slider__item-pic`} alt={el.title}/>
          </Link>
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