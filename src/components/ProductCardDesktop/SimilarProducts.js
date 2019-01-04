import React, { Component } from 'react';

import ListSimilarProducts from './ListSimilarProducts';

const SimilarProducts = (props) => {   

  return(
    <section className="product-card__similar-products-slider">
      <h3>Похожие товары:</h3>
      <div className="similar-products-slider">
        <div className="similar-products-slider__arrow similar-products-slider__arrow_left arrow"></div>
        <ListSimilarProducts list={props.similarProducts} />                
        <div className="similar-products-slider__arrow similar-products-slider__arrow_right arrow"></div> 
      </div>
    </section>
  );
}

export default SimilarProducts;