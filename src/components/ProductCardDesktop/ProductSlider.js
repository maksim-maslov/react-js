import React, { Component } from 'react';

import { HashRouter, Route, Link, Nav, Switch } from 'react-router-dom';

const ProductSlider = ({list = []}) => {
  return list.map((el, index) => {
    return(
      <div className={`favourite-product-slider__item favourite-product-slider__item-${index + 1}`}>
        <img src={el} />
        {/* <Link to={`/product-card-desktop/${el.id}`} />

        </Link> */}
      </div>                       
    )
  })    
}

export default ProductSlider;