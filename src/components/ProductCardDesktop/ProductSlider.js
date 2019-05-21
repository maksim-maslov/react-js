import './css/ProductSlider.css';

import React from 'react';

function ProductSlider({ images, changeImage }) {
  return (
    <section className="main-screen__favourite-product-slider">
      <div className="favourite-product-slider">
        <div className={`favourite-product-slider__arrow favourite-product-slider__arrow_up arrow-up ${images.length <= 3 ? 'hidden' : ''}`}></div>
        
        {images.map((el, index) => {
          return (
            <div className={`favourite-product-slider__item`} 
                 key={index} 
                 onClick={() => changeImage(el)}>
              <img src={el} alt="" />
            </div>                       
          );
        })}         
        
        <div className={`favourite-product-slider__arrow favourite-product-slider__arrow_down arrow-down ${images.length <= 3 ? 'hidden' : ''}`}></div>
      </div>
    </section>
  );  
}

export default ProductSlider;