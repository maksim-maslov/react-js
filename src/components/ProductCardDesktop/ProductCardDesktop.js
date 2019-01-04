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
    this.id = this.props.match.params.id;
    this.getProductInfo();
  }

  componentWillReceiveProps(newProps) {
    this.id = newProps.match.params.id;
    this.getProductInfo();
  }

  getProductInfo() {
    fetch(`https://neto-api.herokuapp.com/bosa-noga/products/${this.id}`)
    .then(response => response.json())
    .then(data => {
      this.setState({product: data.data});
      return fetch(`https://neto-api.herokuapp.com/bosa-noga/products?type=${this.state.product.type}&color=${this.state.product.color}`);
    })
    .then(response => response.json())
    .then(data => this.setState({similarProducts: data.data.filter(el => el.id != this.id)}));
  }

  render() {
    const { product } = this.state;
    const category = product.categoryId && this.props.categories.length ? this.props.categories.find(el => el.id == product.categoryId).title : '';
      return(
        <div>
          {this.state.product.id && 
            <div>
              <Breadcrumbs links={[
                {link: '/main-page', text: 'Главная'}, 
                {link: `/catalogue?categoryId=${product.categoryId}`, text: category }
              ]}/>
              <Product product={this.state.product} updateBasket={this.props.updateBasket} favorites={this.props.favorites} updateBrowsedProducts={this.props.updateBrowsedProducts} category={category} changeFavorites={this.props.changeFavorites}/>
              <BrowsedProducts browsedProducts={this.props.browsedProducts} />            
              <SimilarProducts similarProducts={this.state.similarProducts} />
            </div>
          }
        </div>
      ); 
  }

}

export default ProductCardDesktop;

