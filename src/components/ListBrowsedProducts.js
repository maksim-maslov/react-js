import React, { Component } from 'react';

import { HashRouter, Route, Link, Nav, NavLink, Switch } from 'react-router-dom';

const ListBrowsedProducts = props => {
    return props.list.map((el, index) => {
        return(
            <div className={`overlooked-slider__item overlooked-slider__item-${index + 1}`}>
                <NavLink to="/product-card-desktop" />
            </div>                       
        )
    })    
}

export default ListBrowsedProducts;