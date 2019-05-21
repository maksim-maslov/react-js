import Breadcrumb from '../Breadcrumb/Breadcrumb';
import BrowsedProducts from '../BrowsedProducts/BrowsedProducts';
import Loader from '../Loader/Loader';
import Product from './Product';
import SimilarProducts from './SimilarProducts';

import React, { Component } from 'react';


class ProductCardDesktop extends Component {
  constructor(props) {
    super(props);

    this.state = {
      product: {},
      similarProducts: [],
      id: ''
    };
  }


  componentDidMount() {
    this.init(this.props)
  }


  componentWillReceiveProps(newProps) {
    this.init(newProps);
  }


  init(props) {
    const { id } = this.state;

    if (id === props.match.params.id) {
      return;
    }

    this.setState({id: props.match.params.id});   

    this.getProductInfo(props.match.params.id);
  }


  getProductInfo(id) {
    const { categories, updateBrowsedProducts } = this.props;

    fetch(`https://api-neto.herokuapp.com/bosa-noga/products/${id}`)
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

        this.setState({similarProducts: data.data.filter(el => el.id !== id)});

        updateBrowsedProducts(id);
      });
  }
  

  render() {
    const { updateFavorites, favoritesIdList, updateBasket } = this.props;
    const { product, similarProducts, categoryTitle, id } = this.state;    
    const browsedProducts = this.props.browsedProducts.filter(el => el.id !== id);

    return (
      <div>
        {JSON.stringify(product) !== '{}'
        ? (
          <div>
            <Breadcrumb 
              links={[
                {link: '/main-page', text: 'Главная'}, 
                {link: `/catalogue?categoryId=${product.categoryId}`, text: categoryTitle },
                {link: `#`, text: product.title }
              ]}
            />
            <Product 
              categoryTitle={categoryTitle}
              favoritesIdList={favoritesIdList}  
              product={product}                          
              updateFavorites={updateFavorites}
              updateBasket={updateBasket}                 
            />
            {browsedProducts.length 
            ? <BrowsedProducts browsedProducts={browsedProducts} />
            : ''
            }        
            {similarProducts.length 
            ? <SimilarProducts similarProducts={similarProducts} />
            : ''
            }    
          </div>
        ) 
        : <Loader />
        }
      </div>
    ); 
  }
}

export default ProductCardDesktop;

