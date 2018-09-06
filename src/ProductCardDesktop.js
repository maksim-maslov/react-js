import React, { Component } from 'react';

import BrowsedProducts from './components/BrowsedProducts';
import LikeProducts from './components/LikeProducts';
import Product from './components/Product';
import Breadcrumbs from './components/Breadcrumbs';

const ProductCardDesctop = () => {
    return(
        <div>
            <Breadcrumbs links={[{link: "/main-page", text: "Главная"}, {link: "/catalogue", text: "Женская обувь"}, {link: "#", text: "Ботинки"}, {link: "#", text: "Ботинки женские"}]}/>
            <Product />
            <BrowsedProducts />            
            <LikeProducts />
        </div>
    );
}

export default ProductCardDesctop;

