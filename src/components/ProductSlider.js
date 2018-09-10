import React, { Component } from 'react';

import { HashRouter, Route, Link, Nav, NavLink, Switch } from 'react-router-dom';

const ProductSlider = ({list = []}) => {
    return list.map((el, index) => {
        return(
            <div className={`favourite-product-slider__item favourite-product-slider__item-${index + 1}`}>
                <NavLink to="#" />
            </div>                       
        )
    })    
}

export default ProductSlider;