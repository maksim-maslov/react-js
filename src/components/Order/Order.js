import React, { Component } from 'react';

import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import OrderForm from './OrderForm';
import ProductsInBasket from './ProductsInBasket';

import { HashRouter, Route, Link, Nav, Switch } from 'react-router-dom';

class Order extends Component {
  constructor(props) {
    super(props);  
    this.state = {
      total: 0
    }  
  }

  componentDidMount() {
    this.calcTotal(this.props.productsInBasket);
  }

  componentWillReceiveProps(newProps) {
    this.calcTotal(newProps.productsInBasket);
  }

  calcTotal(productsInBasket) {
    const total = productsInBasket.reduce((memo, el) => {
      memo += el.item.price * el.amount; 
      return memo;
    }, 0);
    this.setState({
      total: total
    }); 
  }

  render() {    
    return( 
      <div className="wrapper order-wrapper">
        <Breadcrumbs links={[{link: '/main-page', text: 'Главная'}, {link: '', text: 'Koрзина'}, {link: '', text: 'Оформление заказа'}]} />                
        <section className="order-process">
          <h2 className="order-process__title">Оформление заказа</h2>   
          {this.props.productsInBasket && <ProductsInBasket productsInBasket={this.props.productsInBasket} total={this.state.total} />}
          <OrderForm  updateBasket={this.props.updateBasket} total={this.state.total} />            
        </section>
      </div>
    );    
  }
  
}

export default Order;