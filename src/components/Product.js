import React, { Component } from 'react';

import ProductSlider from './ProductSlider';
import ProductPic from './ProductPic';


const Product = props => {
    // const images = props.product.images;
    const product = props.product;
    const data = [
        {
            "title": "Босоножки женские",      
            "brand": "Dior",
            "price": 5000
        },
        {
            "title": "Босоножки женские",      
            "brand": "Dior",
            "price": 5000
        },
        {
            "title": "Босоножки женские",      
            "brand": "Dior",
            "price": 5000
        }
    ];
    return(
        <main className="product-card">
            <section className="product-card-content">
                <h2 className="section-name">Ботинки женские</h2>
                <section className="product-card-content__main-screen">
                    <section className="main-screen__favourite-product-slider">
                        <div className="favourite-product-slider">
                            <div className="favourite-product-slider__arrow favourite-product-slider__arrow_up arrow-up"></div>
                            <ProductSlider list={product.images} />
                            {/* <div className="favourite-product-slider__item favourite-product-slider__item-1">
                                <a href="#"></a>
                            </div>
                            <div className="favourite-product-slider__item favourite-product-slider__item-2">
                                <a href="#"></a>
                            </div>
                            <div className="favourite-product-slider__item favourite-product-slider__item-3">
                                <a href="#"></a>
                            </div> */}
                            <div className="favourite-product-slider__arrow favourite-product-slider__arrow_down arrow-down"></div>
                        </div>
                    </section>
                            
                    <ProductPic pic="product-card__favourite-product-pic.png" />

                    {/* <div className="main-screen__favourite-product-pic">
                        <a href="#"><img src={require("..img/product-card-pics/product-card__favourite-product-pic.png")} alt=""/></a>
                        <a href="#" className="main-screen__favourite-product-pic__zoom"></a>
                    </div> */}
                        
                    <div className="main-screen__product-info">
                        <div className="product-info-title"><h2>{product.title}</h2><div className="in-stock">{product.sizes ? "В наличии" : "Нет в наличии"}</div>
                    </div>
                    <div className="product-features">
                        <table className="features-table">
                            <tr>
                                <td className="left-col">Артикул:</td>
                                <td className="right-col">{product.sku}</td>
                            </tr>
                            <tr>
                                <td className="left-col">Производитель:</td>
                                <td className="right-col"><a href="#"><span className="producer">{product.brand}</span></a></td>
                            </tr>
                            <tr>
                                <td className="left-col">Цвет:</td>
                                <td className="right-col">{product.color}</td>
                            </tr>
                            <tr>
                                <td className="left-col">Материалы:</td>
                                <td className="right-col">{product.material}</td>
                            </tr>
                            <tr>
                                <td className="left-col">Сезон:</td>
                                <td className="right-col">{product.season}</td>
                            </tr>
                            <tr>
                                <td className="left-col">Повод:</td>
                                <td className="right-col">{product.reason}</td>
                            </tr>
                        </table>
                    </div>
                    <p className="size">Размер</p>
                    <ul className="sizes">
                        <li><a href="#">36</a></li>
                        <li className="active"><a href="#">37</a></li>
                        <li><a href="#">38</a></li>
                        <li><a href="#">38</a></li>
                        <li><a href="#">39</a></li>
                    </ul>
                    <div className="size-wrapper">
                        <a href="#"><span className="size-rule"></span><p className="size-table">Таблица размеров</p></a>
                    </div>
                    <a href="#" className="in-favourites-wrapper">
                        <div className="favourite" href="#"></div><p className="in-favourites">В избранное</p>
                    </a>
                    <div className="basket-item__quantity">
                        <div className="basket-item__quantity-change basket-item-list__quantity-change_minus">-</div>1
                        <div className="basket-item__quantity-change basket-item-list__quantity-change_plus">+</div>
                    </div>
                    <div className="price">{product.price}</div>
                    <button className="in-basket in-basket-click">В корзину</button>
                    </div>

                </section>
            </section>
        </main>
    );
}

export default Product;