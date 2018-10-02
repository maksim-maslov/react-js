import React, { Component } from 'react';

const ProductSizes = ({sizes = []}) => {

  const onClickHandler = (event) => {
    const sizes = document.querySelectorAll('.sizes li');
    // const inBasketBtn = document.querySelector('button.in-basket-click'); 
    Array.from(sizes).forEach(el => el.classList.remove('active'));
    event.currentTarget.classList.add('active');
    // console.log(inBasketBtn.disabled)
    // inBasketBtn.disabled = false;
  }

  const availableSizes = sizes.filter(el => el.available == true); 

  return availableSizes.map((el, index) => <li key={index} onClick={onClickHandler}>{el.size}</li>);
    
}

export default ProductSizes;