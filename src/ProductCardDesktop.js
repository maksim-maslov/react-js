import React, { Component } from 'react';

import Product from './components/Product';
import BrowsedProducts from './components/BrowsedProducts';
import SimilarProducts from './components/SimilarProducts';
import Breadcrumbs from './components/Breadcrumbs';

class ProductCardDesktop extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          product: {}
        };
    }
    
    componentDidMount() {
        fetch('http://api-neto.herokuapp.com/bosa-noga/products?id[]=25')
            .then(response => response.json())
            .then(data => {this.setState({ product: data.data[0] })});
    }

    render() {
        console.log(this.state)
        const { product } = this.state;
        return(
            <div>
                <Breadcrumbs links={[{link: "/main-page", text: "Главная"}, {link: "/catalogue", text: "Женская обувь"}, {link: "#", text: "Ботинки"}, {link: "#", text: "Ботинки женские"}]}/>
                <Product product={product}/>
                <BrowsedProducts />            
                <SimilarProducts />
            </div>
        );
    }

}


export default ProductCardDesktop;

