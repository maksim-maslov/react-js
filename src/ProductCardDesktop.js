import React, { Component } from 'react';

import Product from './components/Product';
import BrowsedProducts from './components/BrowsedProducts';
import SimilarProducts from './components/SimilarProducts';
import Breadcrumbs from './components/Breadcrumbs';

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
        <Breadcrumbs links={[{link: "/main-page", text: "Главная"}, {link: "/catalogue", text: "Женская обувь"}, {link: "#", text: "Ботинки"}, {link: "#", text: "Ботинки женские"}]}/>
        <Product product={product} updateBasket={this.props.updateBasket}/>
        <BrowsedProducts />            
        <SimilarProducts />
      </div>
    );
  }

}

export default ProductCardDesktop;

