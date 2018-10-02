import React, { Component } from 'react';

import { HashRouter, Route, Link, Nav, NavLink, Switch } from 'react-router-dom';

const ListItemCard = ({list = []}) => {
  return list.map((el, index) => {
    return(
      <NavLink to={`/product-card-desktop/${el.id}`} className="item-list__item-card item" >
        <div className="item-pic"><img className={`item-pic-${index + 1}`} src={el.images[0]} alt={el.title}/>
          <div className="product-catalogue__product_favorite">
            <p></p>
          </div>
          <div className="arrow arrow_left"></div>
          <div className="arrow arrow_right"></div>
        </div>
        <div className="item-desc">
          <h4 className="item-name">{el.title}</h4>
          <p className="item-producer">Производитель: <span className="producer">{el.brand}</span></p>
          <p className="item-price">{el.price}</p>
          <div className="sizes">
          <p className="sizes__title">Размеры в наличии:</p>
          <p className="sizes__avalible">36, 37, 38, 39, 40, 41, 42</p>
          </div>
        </div>
      </NavLink>            
    )
  })
}

export default ListItemCard;