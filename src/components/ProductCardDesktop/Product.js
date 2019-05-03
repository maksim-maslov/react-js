import React, { Component } from 'react';

import ProductSlider from './ProductSlider';
import ProductPic from './ProductPic';
import ProductSizes from './ProductSizes';


class Product extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      size: ''
    };

    this.changeFavorites = this.changeFavorites.bind(this);
    this.changeSize = this.changeSize.bind(this);
    this.addCart = this.addCart.bind(this);
    
  }

  componentWillReceiveProps() {
    this.setState({
      size: ''
    });
  }

  changeSize(size) {
    this.setState({
      size: size
    });
  }  

  addCart(event, id, size) { 
    const product = {id: id, size: size, amount: 1};     
    this.props.updateBasket(event, product);
  }

  changeFavorites(event, id) {      
    event.preventDefault(); 
    this.props.changeFavorites(id);
  }

  render() {
    const { categoryTitle, favoritesIdList, product } = this.props;
    const { size } = this.state;

    return(
      <main className="product-card">
        <section className="product-card-content">
          <h2 className="section-name">{categoryTitle}</h2>
          <section className="product-card-content__main-screen">

            {product.hasOwnProperty('images') && <ProductSlider images={product.images} />}        

            {product.hasOwnProperty('images') && <ProductPic pic={product.images[0]} />}  
                
            <div className="main-screen__product-info">
              <div className="product-info-title">
                <h2>{product.title}</h2>
                <div className="in-stock">{product.sizes ? 'В наличии' : 'Нет в наличии'}</div>
              </div>
              <div className="product-features">
                <table className="features-table">
                  <tr>
                    <td className="left-col">Артикул:</td>
                    <td className="right-col">{product.sku}</td>
                  </tr>
                  <tr>
                    <td className="left-col">Производитель:</td>
                    <td className="right-col"><a href=""><span className="producer">{product.brand}</span></a></td>
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
              
                <ProductSizes 
                  sizes={product.sizes} 
                  size={size} 
                  changeSize={this.changeSize} 
                />

              </ul>
              <div className="size-wrapper">
                <a href=""><span className="size-rule"></span><p className="size-table">Таблица размеров</p></a>
              </div>
              <a className="in-favourites-wrapper" onClick={ev => this.changeFavorites(ev, product.id)}>
                <div 
                  className={
                    favoritesIdList.findIndex(element => element.id == product.id) != -1 
                    ? 'favourite favourite_chosen' 
                    : 'favourite'
                  }
                >
                </div>
                <p className="in-favourites">
                  {
                    favoritesIdList.findIndex(element => element.id == product.id) != -1 
                    ? 'В избранном' 
                    : 'В избранное'
                  }
                </p>
              </a>
              <div className="basket-item__quantity">
                <div className="basket-item__quantity-change basket-item-list__quantity-change_minus">-</div>
                  <span>1</span>
                <div className="basket-item__quantity-change basket-item-list__quantity-change_plus">+</div>
              </div>
              <div className="price">{product.price} ₽</div>
              <button 
                className={`in-basket in-basket-click 
                  ${
                    size 
                    ? '' 
                    : 'in-basket_disabled'
                  }`
                } 
                onClick={ev => this.addCart(ev, product.id, size)}
              >В корзину
              </button>
            </div>

          </section>
        </section>      
      </main>
    );
  }    
}

export default Product;