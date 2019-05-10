import React, { Component } from 'react';

import Breadcrumb from '../Breadcrumb/Breadcrumb';
import Product from './Product';
import SimilarProducts from './SimilarProducts';
import BrowsedProducts from '../BrowsedProducts/BrowsedProducts';

class ProductCardDesktop extends Component {
  constructor(props) {
    super(props);
    this.id = '';
    this.state = {
      product: {},
      similarProducts: []
    };
  }

  componentDidMount() {
    this.init(this.props)
  }

  componentWillReceiveProps(newProps) {
    this.init(newProps);
  }

  init(props) {
    this.id = props.match.params.id;
    this.getProductInfo();
  }

  getProductInfo() {
    fetch(`https://api-neto.herokuapp.com/bosa-noga/products/${this.id}`)
    .then(response => response.json())
    .then(data => {
      this.setState({product: data.data});
      return fetch(`https://api-neto.herokuapp.com/bosa-noga/products?type=${this.state.product.type}&color=${this.state.product.color}`);
    })
    .then(response => response.json())
    .then(data => this.setState({similarProducts: data.data.filter(el => el.id != this.id)}));;
  }

  render() {
    const { product, similarProducts } = this.state;
    const { categories, updateFavorites, favorites, favoritesIdList, updateBasket, updateBrowsedProducts } = this.props;
    const categoryTitle = product.hasOwnProperty('categoryId') && categories.length ? categories.find(el => el.id === product.categoryId).title : '';
    const browsedProducts = this.props.browsedProducts.filter(el => el.id != this.id);

    return(
      <div>
        {product.hasOwnProperty('id') && 
          <div>
            <Breadcrumb links={[
              {link: '/main-page', text: 'Главная'}, 
              {link: `/catalogue?categoryId=${product.categoryId}`, text: categoryTitle },
              {link: `/products/${product.id}`, text: product.title }
            ]}/>
            <Product 
              categoryTitle={categoryTitle}
              updateFavorites={updateFavorites}
              favorites={favorites}
              favoritesIdList={favoritesIdList}
              product={product}
              updateBasket={updateBasket}                 
              updateBrowsedProducts={updateBrowsedProducts}                 
            />
            {
              browsedProducts.length 
              ? <BrowsedProducts browsedProducts={browsedProducts} />
              : ''
            }        
            {
              similarProducts.length 
              ? <SimilarProducts similarProducts={similarProducts} />
              : ''
            }     
          </div>
        }
      </div>
    ); 
  }

}

export default ProductCardDesktop;

