import React, { Component } from 'react';

import { HashRouter, Route, Link, Nav, Switch, Redirect } from 'react-router-dom';

class OrderForm extends Component {
  constructor(props) {
    super(props);

    this.formData = '';

    this.order = {};

    this.state = {
      doRedirect: false
    };
  }

  // let formData;
  
  submit(e) {
    e.preventDefault();

    const {name, phone, address, paid} = this.formData;
    this.order = {
      name: name.value,
      phone: phone.value,
      address: address.value,
      paymentType: paid.value,
      cart: localStorage.cartId
    };

    const params = {
      method: 'POST', 
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(this.order)
    };
    
    console.log('submit', this.order)

    fetch(`https://neto-api.herokuapp.com/bosa-noga/order`, params)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.order.total = document.querySelector('.order-basket__summ span').textContent;
        // this.props.updateOrder(order);
        this.setState({
          doRedirect: true
        });
      });

  }

  render() {
    return(
      <div className="order-process__confirmed">
        <form ref={element => this.formData = element}>
          <div className="order-process__delivery">
            <h3 className="h3">кому и куда доставить?</h3>
            <div className="order-process__delivery-form">
              <label className="order-process__delivery-label">
                <div className="order-process__delivery-text">Имя</div>
                <input className="order-process__delivery-input" type="text" name="name" placeholder="Представьтесь, пожалуйста" defaultValue="Mr" />
              </label>
              <label className="order-process__delivery-label">
                <div className="order-process__delivery-text">Телефон</div>
                <input className="order-process__delivery-input" type="tel" name="phone" placeholder="Номер в любом формате" defaultValue="88007008070"/>
              </label>
              <label className="order-process__delivery-label">
                <div className="order-process__delivery-text">Адрес</div>
                <input className="order-process__delivery-input order-process__delivery-input_adress" type="text" name="address" placeholder="Ваша покупка будет доставлена по этому адресу" defaultValue="Address"/>
              </label>
            </div>
            <p>Все поля обязательны для заполнения. Наш оператор свяжется с вами для уточнения деталей заказа.</p>
          </div>
          <div className="order-process__paid">
            <h3 className="h3">хотите оплатить онлайн или курьеру при получении?</h3>
            <div className="order-process__paid-form">
              <label className="order-process__paid-label">
                <input className="order-process__paid-radio" type="radio" name="paid" value="onlineCard" /><span className="order-process__paid-text">Картой онлайн</span>
              </label>
              <label className="order-process__paid-label">
                <input className="order-process__paid-radio" type="radio" name="paid" value="offlineCard" checked /><span className="order-process__paid-text">Картой курьеру</span>
              </label>
              <label className="order-process__paid-label">
                <input className="order-process__paid-radio" type="radio" name="paid" value="offlineCash" /><span className="order-process__paid-text">Наличными курьеру</span>
              </label>
            </div>
          </div>
          <Link to="order-done"><button className="order-process__form-submit order-process__form-submit_click" onClick={this.submit.bind(this)} >Подтвердить заказ</button></Link>
        </form>
        {this.state.doRedirect && <Redirect to={{pathname: "order-done", state: this.order}} />} 
      </div>      
    );
  }
  
}

export default OrderForm;