import React, { Component } from 'react';

import { HashRouter, Route, Link, Nav, Switch } from 'react-router-dom';

const ProductSlider = ({list = []}) => {
  return(
    <section className="main-screen__favourite-product-slider">
      <div className="favourite-product-slider">
        <div className={`favourite-product-slider__arrow ${list.length > 3 ? 'favourite-product-slider__arrow_up arrow-up' : ''}`}></div>
        
        {list.map((el, index) => {
          return(
            <div className={`favourite-product-slider__item`}>
              <img src={el} />
            </div>                       
          )
        })}         
        
        <div className={`favourite-product-slider__arrow ${list.length > 3 ? 'favourite-product-slider__arrow_down arrow-down' : ''}`}></div>
      </div>
    </section>
  )     
}

export default ProductSlider;