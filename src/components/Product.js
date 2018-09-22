import React, { Component } from 'react';

import ProductSlider from './ProductSlider';
import ProductPic from './ProductPic';
import ProductSizes from './ProductSizes';



class Product extends Component {
    
  constructor(props) {
    super(props);
  }

  addProduct(event) {

    event.preventDefault();

    const amount = Number(document.querySelector('.basket-item__quantity span').textContent);

    const size = Number(document.querySelector('.sizes li.active').textContent);
    const id = this.props.product.id;        
    const product = {id, size, amount};  
    
    this.props.updateBasket(product);
  }

  render() {
    const {product} = this.props;
    return(
      <main className="product-card">
        <section className="product-card-content">
          <h2 className="section-name">Ботинки женские</h2>
          <section className="product-card-content__main-screen">
            <section className="main-screen__favourite-product-slider">
              <div className="favourite-product-slider">
                <div className="favourite-product-slider__arrow favourite-product-slider__arrow_up arrow-up"></div>
                
                  <ProductSlider list={product.images} />
                
                <div className="favourite-product-slider__arrow favourite-product-slider__arrow_down arrow-down"></div>
              </div>
            </section>
                    
            <ProductPic pic={product.images ? product.images[0] : "" } />
                
            <div className="main-screen__product-info">
              <div className="product-info-title">
                <h2>{product.title}</h2>
                <div className="in-stock">{product.sizes ? "В наличии" : "Нет в наличии"}</div>
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
              
                <ProductSizes sizes={product.sizes} />

              </ul>
              <div className="size-wrapper">
                <a href="#"><span className="size-rule"></span><p className="size-table">Таблица размеров</p></a>
              </div>
              <a href="#" className="in-favourites-wrapper">
                <div className="favourite" href="#"></div>
                <p className="in-favourites">В избранное</p>
              </a>
              <div className="basket-item__quantity">
                <div className="basket-item__quantity-change basket-item-list__quantity-change_minus">-</div>
                  <span>1</span>
                <div className="basket-item__quantity-change basket-item-list__quantity-change_plus">+</div>
              </div>
              <div className="price">{product.price}</div>
              <button className="in-basket in-basket-click" onClick={this.addProduct.bind(this)}>В корзину</button>
            </div>

          </section>
        </section>
      </main>
    );
  }    
}

export default Product;