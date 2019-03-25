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
    this.getSimilarProducts();
    this.props.updateBrowsedProducts(this.id);
  }

  getProductInfo() {
    fetch(`/products/${this.id}`)
    .then(response => response.json())
    .then(data => this.setState({product: data.data}));
  }

  getSimilarProducts() {
    fetch(`/products?type=${this.state.product.type}&color=${this.state.product.color}`)
    .then(response => response.json())
    .then(data => this.setState({similarProducts: data.data.filter(el => el.id != this.id)}));
  }

  render() {
    const { product, similarProducts } = this.state;
    const { browsedProducts, categories, changeFavorites, favorites, favoritesIdList, updateBasket, updateBrowsedProducts } = this.props;
    const categoryTitle = product.hasOwnProperty('categoryId') && categories.length ? categories.find(el => el.id === product.categoryId).title : '';

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
              changeFavorites={changeFavorites}
              favorites={favorites}
              favoritesIdList={favoritesIdList}                 
              product={product} 
              updateBasket={updateBasket}                 
              updateBrowsedProducts={updateBrowsedProducts}                 
            />
            {browsedProducts.length != 0 && <BrowsedProducts browsedProducts={browsedProducts} />}        
            {similarProducts.length != 0 && <SimilarProducts similarProducts={similarProducts} />}     
          </div>
        }
      </div>
    ); 
  }

}

export default ProductCardDesktop;

