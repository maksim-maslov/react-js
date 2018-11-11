import React, { Component } from 'react';

import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import Product from './Product';
import SimilarProducts from './SimilarProducts';
import BrowsedProducts from '../BrowsedProducts/BrowsedProducts';

class ProductCardDesktop extends Component {

  constructor(props) {
    super(props);
    this.id = props.match.params.id;
    this.state = {
      product: {},
      similarProducts: []
    };
  }
  
  componentDidMount() {
    fetch(`https://neto-api.herokuapp.com/bosa-noga/products/${this.id}`)
      .then(response => response.json())
      .then(data => {
        this.setState({product: data.data});
        return fetch(`https://neto-api.herokuapp.com/bosa-noga/products?type=${this.state.product.type}&color=${this.state.product.color}`);
      })
      .then(response => response.json())
      .then(data => {
        this.setState({similarProducts: data.data});
      });
    
  }

  render() {
    console.log('this.state.similarProducts', this.state.similarProducts)
    const {product} = this.state;
    const category = product.categoryId && this.props.categories.length ? this.props.categories.find(el => el.id == product.categoryId).title : '';
      console.log('prodUct', product)
      console.log('gjhlkj;l;k;ljl;kl;kl', this.props.browsedProducts)
      return(
        <div>
          {this.state.product.id && (
            <div>
              <Breadcrumbs links={[
                {link: '/main-page', text: 'Главная'}, 
                {link: `/catalogue?categoryId=${product.categoryId}`, text: category }
                // , 
                // {link: '', text: 'Ботинки'}, 
                // {link: '', text: 'Ботинки женские'}
              ]}/>
              <Product product={this.state.product} updateBasket={this.props.updateBasket} updateFavorites={this.props.updateFavorites} updateBrowsedProducts={this.props.updateBrowsedProducts} category={category} />
              <BrowsedProducts browsedProducts={this.props.browsedProducts} />            
              <SimilarProducts similarProducts={this.state.similarProducts} />
            </div>
          )}
        </div>
      ); 
  }

}

export default ProductCardDesktop;

