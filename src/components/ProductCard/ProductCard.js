import './css/ProductCard.css';

import React from 'react';
import { Link } from 'react-router-dom';


function ProductCard({ index, product, updateFavorites, favoritesIdList }) {

  let classNameFavorite = 'item-pic-favorite__like_favorites';

  if (favoritesIdList) {
    classNameFavorite = favoritesIdList.findIndex(el => el.id === product.id) === -1 
    ? 'item-pic-favorite__like_not-favorites' 
    : 'item-pic-favorite__like_not-favorites-choosen';
  }

  const handlerClick = (event, id) => {
    event.preventDefault(); 
    updateFavorites(id);    
  }

  return (
    <li className="product-catalogue__item" key={product.id}>
      <Link to={`/product-card-desktop/${product.id}`} className="item-list__item-card item">

        <div className="item-pic">
          <img 
            className={`item-pic-${index + 1}`} 
            src={product.images[0]} alt={product.title} />
          <div className="item-pic__favorite">          
            <p className={`item-pic-favorite__like ${classNameFavorite}`}
               onClick={ev => handlerClick(ev, product.id)}>
            </p>
          </div>                    
        </div>

        <div className="item-desc">
          <h4 className="item-name">{product.title}</h4>
          <p className="item-producer">
            <span className="producer">{product.brand}</span>
          </p>
          <p className="item-price">
            {product.price}&nbsp;
            <i className="fa fa-rub" aria-hidden="true"></i>
          </p>
        </div>
        
      </Link> 
    </li>
  );    
}

export default ProductCard;