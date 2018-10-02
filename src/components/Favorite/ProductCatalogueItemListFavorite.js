import React, { Component } from 'react';

import ListItemCard from '../ListItemCard';

class ProductCatalogueItemListFavorite extends Component {

  constructor(props) {
    super(props);

    this.state = {
      favorite: []
    };
  }
  
  componentDidMount() {
    fetch('https://neto-api.herokuapp.com/bosa-noga/products')
      .then(response => response.json())
      .then(data => {this.setState({ favorite: data.data })});
  }

  render() {
    const { favorite } = this.state;
    return(
      <section className="product-catalogue__item-list product-catalogue__item-list_favorite">
          <ListItemCard list={favorite} />
      </section>            
    )
  }

}

export default ProductCatalogueItemListFavorite;