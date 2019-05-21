import './css/BasketItem.css';

import React from 'react';
import { Link } from 'react-router-dom';


function BasketItem({ product }) {
  return (
    <div className="basket-item">

      <div className="basket-item__pic">
        <img src={product.item.images[0]} alt="product_1" />
      </div>

      <div className="basket-item__product">
        <div className="basket-item__product-name">
          <Link to={`/product-card-desktop/${product.item.id}`}>{product.item.title}</Link>
        </div>

        <div className="basket-item__product-features">
          <div className="basket-item__size">
            Размер: 
            <span>{product.size}</span>
          </div>
          <div className="basket-item__producer">
            Производитель: 
            <span>{product.item.brand}</span>
          </div>
          <div className="basket-item__color">
            {product.item.color ? 'Цвет: ' : ''}
            <span>{product.item.color}</span>
          </div>
        </div>
      </div>

      <div className="basket-item__quantity">
        <div className="basket-item__quantity-change basket-item-list__quantity-change_minus">-</div>
          <span>{product.amount}</span>
        <div className="basket-item__quantity-change basket-item-list__quantity-change_plus">+</div>
      </div>

      <div className="basket-item__price">
        {product.item.price} 
        <i className="fa fa-rub" aria-hidden="true"></i>
      </div>

    </div>
  );
}

export default BasketItem;