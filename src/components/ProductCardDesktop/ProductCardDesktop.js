import Breadcrumb from '../Breadcrumb/Breadcrumb';
import BrowsedProducts from '../BrowsedProducts/BrowsedProducts';
import Loader from '../Loader/Loader';
import Product from './Product';
import SimilarProducts from './SimilarProducts';

import React, { Component } from 'react';


class ProductCardDesktop extends Component {
  constructor(props) {
    super(props);

    this.id = '';

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

    if (this.id == props.match.params.id) {
      return;
    }

    this.id = props.match.params.id;   

    this.getProductInfo();
  }


  getProductInfo() {
    const { categories, updateBrowsedProducts } = this.props;

    fetch(`https://api-neto.herokuapp.com/bosa-noga/products/${this.id}`)
      .then(response => response.json())
      .then(data => {

        this.setState({
          product: data.data,
          categoryTitle: categories.find(el => el.id === data.data.categoryId).title
        });

        return fetch(`https://api-neto.herokuapp.com/bosa-noga/products?type=${data.data.type}&color=${data.data.color}`);
      })
      .then(response => response.json())
      .then(data => {

        this.setState({similarProducts: data.data.filter(el => el.id != this.id)});

        updateBrowsedProducts(this.id);
      });
  }
  

  render() {
    const { product, similarProducts, categoryTitle } = this.state;
    const { categories, updateFavorites, favoritesIdList, updateBasket } = this.props;
    const browsedProducts = this.props.browsedProducts.filter(el => el.id != this.id);

    return(
      <div>
        {JSON.stringify(product) != '{}'
        ? <div>
            <Breadcrumb links={[
              {link: '/main-page', text: 'Главная'}, 
              {link: `/catalogue?categoryId=${product.categoryId}`, text: categoryTitle },
              {link: `#`, text: product.title }
            ]}/>
            <Product 
              categoryTitle={categoryTitle}
              updateFavorites={updateFavorites}
              favoritesIdList={favoritesIdList}
              product={product}
              updateBasket={updateBasket}                 
            />
            {
              browsedProducts.length 
              ? <BrowsedProducts browsedProducts={browsedProducts} />
              : ''
            }        
            {
              similarProducts.length 
              ? <SimilarProducts similarProducts={similarProducts} />
              : ''
            }    
          </div>
        : <Loader />}
      </div>
    ); 
  }
}

export default ProductCardDesktop;

