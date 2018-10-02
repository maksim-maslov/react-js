import React, { Component } from 'react';

import ProductBasket from './ProductBasket';

const ListProductsBasket = ({productsInBasket = [], updateBasket}) => {
  return productsInBasket.map(el =>  <ProductBasket product={el} updateBasket={updateBasket} />)
}

export default ListProductsBasket;