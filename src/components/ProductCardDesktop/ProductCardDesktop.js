import React, { Component } from 'react';

import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import Product from './Product';
import SimilarProducts from './SimilarProducts';
import BrowsedProducts from '../BrowsedProducts/BrowsedProducts';

class ProductCardDesktop extends Component {
  constructor(props) {
    super(props);
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
    const id = props.match.params.id;
    this.getProductInfo();
    this.getSimilarProducts();
    this.props.updateBrowsedProducts(id);
  }

  getProductInfo() {
    fetch(`https://neto-api.herokuapp.com/bosa-noga/products/${this.id}`)
    .then(response => response.json())
    .then(data => this.setState({product: data.data}));
  }

  getSimilarProducts() {
    fetch(`https://neto-api.herokuapp.com/bosa-noga/products?type=${this.state.product.type}&color=${this.state.product.color}`)
    .then(response => response.json())
    .then(data => this.setState({similarProducts: data.data.filter(el => el.id != this.id)}));
  }

  render() {
    const { product, similarProducts } = this.state;
    const { browsedProducts, categories, changeFavorites, favorites, favoritesIdList, updateBasket, updateBrowsedProducts } = this.props;
    const categoryTitle = product.categoryId && categories.length ? categories.find(el => el.id === product.categoryId).title : '';

    return(
      <div>
        {product.id && 
          <div>
            <Breadcrumbs links={[
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

