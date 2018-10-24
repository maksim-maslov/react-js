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
      product: {}
    };
  }
  
  componentDidMount() {
    fetch(`https://neto-api.herokuapp.com/bosa-noga/products/${this.id}`)
      .then(response => response.json())
      .then(data => {this.setState({product: data.data})});
  }

  render() {
    const {product} = this.state;
    const category = product.categoryId && this.props.categories.length ? this.props.categories.find(el => el.id == product.categoryId).title : '';
      return(
        <div>
          <Breadcrumbs links={[
            {link: '/main-page', text: 'Главная'}, 
            {link: `/catalogue?categoryId=${product.categoryId}`, text: category }
            // , 
            // {link: '', text: 'Ботинки'}, 
            // {link: '', text: 'Ботинки женские'}
          ]}/>
          <Product product={product} updateBasket={this.props.updateBasket} updateFavorites={this.props.updateFavorites} category={category} />
          <BrowsedProducts />            
          <SimilarProducts />
        </div>
      ); 
  }

}

export default ProductCardDesktop;

