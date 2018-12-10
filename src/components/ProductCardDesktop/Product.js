import React, { Component } from 'react';

import ProductSlider from './ProductSlider';
import ProductPic from './ProductPic';
import ProductSizes from './ProductSizes';


class Product extends Component {
    
  constructor(props) {
    super(props);

    // localStorage.browsedProducts = [];
    
    this.favoriteIdList = localStorage.getItem('favorites') 
    ? JSON.parse(localStorage.getItem('favorites')) 
    : [];
    // console.log('array', this.favoriteIdList)
    this.state = {
      isFavorite: this.favoriteIdList.find(el => el.id == this.props.product.id)
    };

    this.browsedProducts = localStorage.getItem('browsedProducts') 
    ? JSON.parse(localStorage.getItem('browsedProducts')) 
    : [];
    // console.log('array', this.favoriteIdList)
    if (!this.browsedProducts.find(el => el.id == this.props.product.id)) {
      this.browsedProducts.push({id: this.props.product.id});
      if (this.browsedProducts.length > 10) {
        this.browsedProducts.splice(0, 1);
      }
      localStorage.browsedProducts = JSON.stringify(this.browsedProducts);
    }

    this.props.updateBrowsedProducts(); 
    
  }

  addCart(event) {

    event.preventDefault();

    const amount = Number(document.querySelector('.basket-item__quantity span').textContent);

    const size = Number(document.querySelector('.sizes li.active').textContent);
    const id = this.props.product.id;        
    const product = {id, size, amount};  
    
    this.props.updateBasket(product);
  }

  addFavorites(event) {    
    // const favorite = event.currentTarget.querySelector('.in-favourites');
    // const favoritePic = event.currentTarget.querySelector('.favourite');
    // this.favoriteIdList = JSON.parse(localStorage.getItem('favorites'));
    // console.log(this.favoriteIdList);
    // this.favoriteIdList.shift();
    
    if (!this.state.isFavorite) {
      // console.log(this.favoriteIdList)
      this.favoriteIdList.push({id: this.props.product.id});
      localStorage.favorites = JSON.stringify(this.favoriteIdList);
      this.setState({isFavorite: !this.state.isFavorite});
      // favoritePic.classList.add('favourite_chosen');
      // favorite.textContent = 'В избранном';
    } else {
      const removeElementIndex = this.favoriteIdList.findIndex(el => el.id == this.props.product.id);
      this.favoriteIdList.splice(removeElementIndex, 1);
      localStorage.favorites = JSON.stringify(this.favoriteIdList);
      // favorite.textContent = 'В избранное';
      this.setState({ isFavorite: !this.state.isFavorite });
      // favoritePic.classList.remove('favourite_chosen');
    }
    this.props.updateFavorites();
    
    // favorite.textContent = favorite.textContent === 'В избранное' ? 'В избранном' : 'В избранное';
  }

  render() {
    // console.log(localStorage)
    const {product} = this.props;
    return(
      <main className="product-card">
        <section className="product-card-content">
          <h2 className="section-name">{this.props.category}</h2>
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
                <a href=""><span className="size-rule"></span><p className="size-table">Таблица размеров</p></a>
              </div>
              <a className="in-favourites-wrapper" onClick={this.addFavorites.bind(this)}>
                <div className={this.state.isFavorite ? 'favourite favourite_chosen' : 'favourite'}></div>
                <p className="in-favourites" >{this.state.isFavorite ? 'В избранном' : 'В избранное'}</p>
              </a>
              <div className="basket-item__quantity">
                <div className="basket-item__quantity-change basket-item-list__quantity-change_minus">-</div>
                  <span>1</span>
                <div className="basket-item__quantity-change basket-item-list__quantity-change_plus">+</div>
              </div>
              <div className="price">{product.price}</div>
              <button className="in-basket in-basket-click" onClick={this.addCart.bind(this)}>В корзину</button>
            </div>

          </section>
        </section>
      </main>
    );
  }    
}

export default Product;