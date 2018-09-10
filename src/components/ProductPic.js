import React, { Component } from 'react';

const ProductPic= props => {
    return(
        <div className="main-screen__favourite-product-pic">
            <a href="#"><img src={require(`../img/product-card-pics/${props.pic}`)} alt=""/></a>
            <a href="#" className="main-screen__favourite-product-pic__zoom"></a>
        </div>
    );
}

export default ProductPic;