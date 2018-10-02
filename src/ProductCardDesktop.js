import React, { Component } from 'react';

import Breadcrumbs from './components/Breadcrumbs/Breadcrumbs';
import Product from './components/ProductCardDesktop/Product';
import SimilarProducts from './components/ProductCardDesktop/SimilarProducts';
import BrowsedProducts from './components/BrowsedProducts/BrowsedProducts';

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
    return(
      <div>
        <Breadcrumbs links={[
          {link: '/main-page', text: 'Главная'}, 
          {link: `/catalogue?categoryId=${product.categoryId}`, text: product.categoryId ? this.props.categories.find(el => el.id == product.categoryId).title : "" }
          // , 
          // {link: '', text: 'Ботинки'}, 
          // {link: '', text: 'Ботинки женские'}
        ]}/>
        <Product product={product} updateBasket={this.props.updateBasket}/>
        <BrowsedProducts />            
        <SimilarProducts />
      </div>
    );
  }

}

export default ProductCardDesktop;

