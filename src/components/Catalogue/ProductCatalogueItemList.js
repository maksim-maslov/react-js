import React, { Component } from 'react';

import ListItemCard from './ListItemCard';


class ProductCatalogueItemList extends Component {

  constructor(props) {
    super(props);
    
  }

  render() {
    if (!this.props) {
      return false;
    }
    return(
      <section className="product-catalogue__item-list product-catalogue__item-list_favorite">
          <ListItemCard list={this.props.products} updateFavorites={this.props.updateFavorites} />
      </section>            
    );
  }

}

export default ProductCatalogueItemList;



