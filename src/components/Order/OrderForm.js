import './css/OrderForm.css';

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';


class OrderForm extends Component {
  constructor(props) {
    super(props);

    this.formData = '';
    this.order = {};

    this.state = {
      doRedirect: false,
      isValidForm: false
    };

    this.submit = this.submit.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  
  submit(event) {
    event.preventDefault();    

    if (!this.state.isValidForm) {
      return;
    }   
    
    const { updateBasket } = this.props;
    const { name, phone, address, paid } = this.formData;
    
    this.order = {
      name: name.value,
      phone: phone.value,
      address: address.value,
      paymentType: paid.value,
      cart: localStorage.getItem('cartId'),
      total: this.props.total
    };

    const params = {
      method: 'POST', 
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(this.order)
    };

    fetch(`https://api-neto.herokuapp.com/bosa-noga/order`, params)
      .then(response => response.json())
      .then(data => {        
        this.setState({doRedirect: true});
        localStorage.setItem('cartId', '');
        updateBasket();        
      }); 
  }


  validateForm() {    
    const { name, phone, address } = this.formData;
    name.value && phone.value && address.value
    ? this.setState({isValidForm: true})
    : this.setState({isValidForm: false});
  }


  render() {
    const { isValidForm } = this.state;
    
    return(
      <div className="order-process__confirmed">

        <form ref={element => this.formData = element} onSubmit={ev => this.submit(ev)}>
          <div className="order-process__delivery">
            <h3 className="h3">кому и куда доставить?</h3>

            <div className="order-process__delivery-form">
              <label className="order-process__delivery-label">
                <div className="order-process__delivery-text">Имя</div>
                <input 
                  className="order-process__delivery-input" 
                  type="text" 
                  name="name" 
                  placeholder="Представьтесь, пожалуйста" 
                  onChange={this.validateForm}
                />
              </label>

              <label className="order-process__delivery-label">
                <div className="order-process__delivery-text">Телефон</div>
                <input 
                  className="order-process__delivery-input" 
                  type="tel" 
                  name="phone" 
                  placeholder="Номер в любом формате" 
                  onChange={this.validateForm}
                />
              </label>

              <label className="order-process__delivery-label">
                <div className="order-process__delivery-text">Адрес</div>
                <input 
                  className="order-process__delivery-input order-process__delivery-input_adress" 
                  type="text" 
                  name="address" 
                  placeholder="Ваша покупка будет доставлена по этому адресу" 
                  onChange={this.validateForm}
                />
              </label>
            </div>

            <p>Все поля обязательны для заполнения. Наш оператор свяжется с вами для уточнения деталей заказа.</p>
          </div>

          <div className="order-process__paid">
            <h3 className="h3">хотите оплатить онлайн или курьеру при получении?</h3>
            <div className="order-process__paid-form">
              <label className="order-process__paid-label">
                <input className="order-process__paid-radio" type="radio" name="paid" value="onlineCard"/>
                <span className="order-process__paid-text">Картой онлайн</span>
              </label>
              <label className="order-process__paid-label">
                <input className="order-process__paid-radio" type="radio" name="paid" value="offlineCard" checked/>
                <span className="order-process__paid-text">Картой курьеру</span>
              </label>
              <label className="order-process__paid-label">
                <input className="order-process__paid-radio" type="radio" name="paid" value="offlineCash"/>
                <span className="order-process__paid-text">Наличными курьеру</span>
              </label>
            </div>
          </div>
          
          <button 
            className={`order-process__form-submit order-process__form-submit_click 
              ${isValidForm ? '' : 'order-process__form-submit_disabled'}`
            }               
            type="submit"
          >Подтвердить заказ</button> 
        </form>

        {this.state.doRedirect && <Redirect to={{pathname: "order-done", state: this.order}} />} 

      </div>      
    );
  }  
}

export default OrderForm;