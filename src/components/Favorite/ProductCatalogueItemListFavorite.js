import React, { Component } from 'react';

import ListItemCardFavorite from './ListItemCardFavorite';

class ProductCatalogueItemListFavorite extends Component {

  constructor(props) {
    super(props);

    // this.favoriteIdList = localStorage.getItem('favorite') ? JSON.parse(localStorage.getItem('favorite')) : new Array()

    // this.state = {
    //   favorite: []
    // };
    
  }
  
  // componentDidMount() {
  //   console.log(this.favoriteIdList)
  //   this.getData(this.favoriteIdList)
  //   // fetch('https://neto-api.herokuapp.com/bosa-noga/products')
  //   //   .then(response => response.json())
  //   //   .then(data => {this.setState({ favorite: data.data })});
  // }

  // getData(products) {

  //   const queryString = products.reduce((memo, el) => {
  //     memo = memo + `id[]=${el.id}&`;
  //     return memo;
  //   }, '');
  //   console.log('queryString', queryString)
  //   fetch(`http://api-neto.herokuapp.com/bosa-noga/products?${queryString}`)
  //     .then(response => response.json())
  //     .then(data => {this.setState({ favorite: data.data })});

  // }

  render() {
    const { favorites } = this.props;
    // console.log(favorites)
    // if (!this.props) {
    //   return false;
    // }
    return(favorites &&
      <section className="product-catalogue__item-list product-catalogue__item-list_favorite">
          <ListItemCardFavorite list={favorites} updateFavorites={this.props.updateFavorites} />
      </section>            
    );
  }

}

export default ProductCatalogueItemListFavorite;