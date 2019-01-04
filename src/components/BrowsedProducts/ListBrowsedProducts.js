import React, { Component } from 'react';

import { HashRouter, Route, Link, Nav, Switch } from 'react-router-dom';

const ListBrowsedProducts = props => {
  return props.list.map((el, index) => {
    return(index < 3 &&
      <div className={`overlooked-slider__item`}>
        <Link to={`/product-card-desktop/${el.id}`}>
          <img src={el.images[0]} className={`overlooked-slider__item-pic`} alt={el.title}/>
        </Link>        
      </div>                       
    )
  })    
}

export default ListBrowsedProducts;