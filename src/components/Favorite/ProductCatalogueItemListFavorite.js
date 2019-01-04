import React, { Component } from 'react';

import ListItemCardFavorite from './ListItemCardFavorite';

class ProductCatalogueItemListFavorite extends Component {

  constructor(props) {
    super(props);
    
  }

  render() {
    const { favorites } = this.props;
    return(favorites &&
      <section className="product-catalogue__item-list product-catalogue__item-list_favorite">
          <ListItemCardFavorite list={favorites} updateFavorites={this.props.updateFavorites} />
      </section>            
    );
  }

}

export default ProductCatalogueItemListFavorite;