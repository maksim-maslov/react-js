import React, { Component } from 'react';

const ProductPic= ({pic}) => {
  return(
    <div className="main-screen__favourite-product-pic">
      <a><img src={pic} alt=""/></a>
      <a className="main-screen__favourite-product-pic__zoom"></a>
    </div>
  );
}

export default ProductPic;