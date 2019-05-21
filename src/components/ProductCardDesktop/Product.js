import './css/Product.css';

import ProductPic from './ProductPic';
import ProductSizes from './ProductSizes';
import ProductSlider from './ProductSlider';

import React, { Component } from 'react';


class Product extends Component { 
  constructor(props) {
    super(props);

    this.state = {
      size: '',
      imageSrc: ''
    };

    this.changeSize = this.changeSize.bind(this);
    this.changeImage = this.changeImage.bind(this);    
  }


  componentWillReceiveProps(newProps) {
    this.setState({
      size: '',
      imageSrc: newProps.product.images[0]
    });
  }


  changeSize(size) {
    this.setState({size: size});
  }  


  changeImage(imageSrc) {
    this.setState({imageSrc: imageSrc});
  } 


  render() {
    const { categoryTitle, favoritesIdList, product, updateFavorites, updateBasket } = this.props;
    const { size, imageSrc } = this.state;

    return (
      <main className="product-card">
        <section className="product-card-content">

          <h2 className="section-name">{categoryTitle}</h2>

          <section className="product-card-content__main-screen">
            <ProductSlider 
              images={product.images} 
              changeImage={this.changeImage}
            />  

            <ProductPic pic={imageSrc} />
                
            <div className="main-screen__product-info">
              <div className="product-info-title">
                <h2>{product.title}</h2>
                <div className="in-stock">{product.sizes ? 'В наличии' : 'Нет в наличии'}</div>
              </div>

              <div className="product-features">
                <table className="features-table">                  
                  <tr>
                    <td className="left-col">Бренд</td>
                    <td className="right-col">
                      <a>
                        <span className="producer">{product.brand}</span>
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="left-col">Артикул</td>
                    <td className="right-col">{product.sku}</td>
                  </tr>
                  <tr>
                    <td className="left-col">Цвет</td>
                    <td className="right-col">{product.color}</td>
                  </tr>
                  <tr>
                    <td className="left-col">Материалы</td>
                    <td className="right-col">{product.material}</td>
                  </tr>
                  <tr>
                    <td className="left-col">Сезон</td>
                    <td className="right-col">{product.season}</td>
                  </tr>
                  <tr>
                    <td className="left-col">Повод</td>
                    <td className="right-col">{product.reason}</td>
                  </tr>
                </table>
              </div>

              <p className="size">Размер</p>

              <ul className="sizes">              
                <ProductSizes 
                  size={size}                 
                  sizes={product.sizes} 
                  changeSize={this.changeSize} 
                />
              </ul>

              <div className="size-wrapper">
                <a>
                  <span className="size-rule"></span>
                  <p className="size-table">Таблица размеров</p>
                </a>
              </div>

              <a className="in-favourites-wrapper" 
                 onClick={() => updateFavorites(product.id)}>
                <div className={favoritesIdList.findIndex(element => element.id === product.id) !== -1 
                     ? 'favourite favourite_chosen' 
                     : 'favourite'}>
                </div>
                <p className="in-favourites">
                  {favoritesIdList.findIndex(element => element.id === product.id) !== -1 
                  ? 'В избранном' 
                  : 'В избранное'}
                </p>
              </a>

              <div className="basket-item__quantity">
                <div className="basket-item__quantity-change basket-item-list__quantity-change_minus">-</div>
                  <span>1</span>
                <div className="basket-item__quantity-change basket-item-list__quantity-change_plus">+</div>
              </div>

              <div className="price">
                {product.price}&nbsp;
                <i className="fa fa-rub" aria-hidden="true"></i>
              </div>

              <button 
                className={`in-basket in-basket-click ${size ? '' : 'in-basket_disabled'}`} 
                onClick={() => updateBasket({id: product.id, size: size, amount: 1})}>
                В корзину
              </button>
            </div>            
          </section>
          
        </section>      
      </main>
    );
  }    
}

export default Product;