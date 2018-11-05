import React, { Component } from 'react';

import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import OrderForm from './OrderForm';
import ProductsInBasket from './ProductsInBasket';

import { HashRouter, Route, Link, Nav, Switch } from 'react-router-dom';

class Order extends Component {
  constructor(props) {
    super(props);

    // this.state = {productsInBasket: props.location.state ? props.location.state.productsInBasket : []}
    
  }

  render() {
    console.log('order', this);
    // const productsInBasket = this.state.productsInBasket;
    return( 
      <div className="wrapper order-wrapper">
        <Breadcrumbs links={[{link: '/main-page', text: 'Главная'}, {link: '', text: 'Koрзина'}, {link: '', text: 'Оформление заказа'}]} />                
        <section className="order-process">
          <h2 className="order-process__title">Оформление заказа</h2>   
          {this.props.productsInBasket && <ProductsInBasket productsInBasket={this.props.productsInBasket} />}
          <OrderForm  updateOrder={this.props.updateOrder}/>            
        </section>
      </div>
    );    
  }
  
}

export default Order;