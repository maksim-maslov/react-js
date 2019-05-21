import './css/Order.css';

import Breadcrumb from '../Breadcrumb/Breadcrumb';
import OrderForm from './OrderForm';
import ProductsInBasket from './ProductsInBasket';

import React, { Component } from 'react';


class Order extends Component {
  constructor(props) {
    super(props);  

    this.state = {
      total: 0
    }; 
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
    this.setState({total: total}); 
  }


  render() {  
    const { productsInBasket, updateBasket } = this.props; 
    const { total } = this.state;

    return ( 
      <div className="wrapper order-wrapper">

        <Breadcrumb links={[{link: '/main-page', text: 'Главная'}, {link: '#', text: 'Оформление заказа'}]} /> 

        <section className="order-process">

          {productsInBasket.length
          ? (
            <div>
              <h2 className="order-process__title">Оформление заказа</h2>   
              <ProductsInBasket 
                productsInBasket={productsInBasket} 
                total={total} 
              />          
              <OrderForm 
                total={total}
                updateBasket={updateBasket}  
              /> 
            </div>
          ) 
          : <div className="order-process__basket-is-empty">В вашей корзине пока ничего нет</div>
          }  

        </section>

      </div>
    );    
  }  
}

export default Order;