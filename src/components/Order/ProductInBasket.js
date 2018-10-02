import React, { Component } from 'react';

const ProductInBasket = () => {
    return(
        <div className="order-process__basket order-basket">
            <div className="order-basket__title">в вашей корзине:</div>
            <div className="order-basket__item-list">
                <div className="basket-item">
                    <div className="basket-item__pic"><img src="img/catalogue-pics/product-catalogue__item-1.png" alt="product_1"/></div>
                    <div className="basket-item__product">
                        <div className="basket-item__product-name"><a href="#">Босоножки женские</a></div>
                        <div className="basket-item__product-features">
                            <div className="basket-item__size">Размер: <span>37</span></div>
                            <div className="basket-item__producer">Производитель: <span>Albano</span></div>
                            <div className="basket-item__color">Цвет: <span>Черный</span></div>
                        </div>
                    </div>
                    <div className="basket-item__quantity">
                        <div className="basket-item__quantity-change basket-item-list__quantity-change_minus">-</div>1
                        <div className="basket-item__quantity-change basket-item-list__quantity-change_plus">+</div>
                    </div>
                    <div className="basket-item__price">5 950 <i className="fa fa-rub" aria-hidden="true"></i></div>
                </div>
                <div className="basket-item">
                    <div className="basket-item__pic"><img src="img/catalogue-pics/product-catalogue__item-1.png" alt="product_1"/></div>
                    <div className="basket-item__product">
                        <div className="basket-item__product-name"><a href="#">Босоножки женские</a></div>
                        <div className="basket-item__product-features">
                            <div className="basket-item__size">Размер: <span>37</span></div>
                            <div className="basket-item__producer">Производитель: <span>Albano</span></div>
                            <div className="basket-item__color">Цвет: <span>Черный</span></div>
                        </div>
                    </div>
                    <div className="basket-item__quantity">
                        <div className="basket-item__quantity-change basket-item-list__quantity-change_minus">-</div>1
                        <div className="basket-item__quantity-change basket-item-list__quantity-change_plus">+</div>
                    </div>
                    <div className="basket-item__price">5 950 <i className="fa fa-rub" aria-hidden="true"></i></div>
                </div>
            </div>
            <div className="order-basket__summ">Итого:&nbsp;<span>12 050 <i className="fa fa-rub" aria-hidden="true"></i></span></div>
        </div>
    );
}

export default ProductInBasket;