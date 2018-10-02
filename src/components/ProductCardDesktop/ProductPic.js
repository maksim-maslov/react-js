import React, { Component } from 'react';

const ProductPic= ({pic}) => {
  return(
    <div className="main-screen__favourite-product-pic">
      <a href="#"><img src={pic} alt=""/></a>
      <a href="#" className="main-screen__favourite-product-pic__zoom"></a>
    </div>
  );
}

export default ProductPic;