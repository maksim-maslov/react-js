import './css/ProductSlider.css';

import React, { Component } from 'react';

import { HashRouter, Route, Link, Nav, Switch } from 'react-router-dom';

const ProductSlider = ({ images, changeImage }) => {
  return(
    <section className="main-screen__favourite-product-slider">
      <div className="favourite-product-slider">
        <div className={`favourite-product-slider__arrow favourite-product-slider__arrow_up arrow-up ${images.length <= 3 ? 'hidden' : ''}`}></div>
        
        {images.map((el, index) => {
          return(
            <div className={`favourite-product-slider__item`} onClick={() => changeImage(el)} >
              <img src={el} />
            </div>                       
          )
        })}         
        
        <div className={`favourite-product-slider__arrow favourite-product-slider__arrow_down arrow-down ${images.length <= 3 ? 'hidden' : ''}`}></div>
      </div>
    </section>
  )     
}

export default ProductSlider;