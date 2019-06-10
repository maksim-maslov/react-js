import './css/OrderDone.css';
import paymentTypes from '../../paymentTypes.js';

import Breadcrumb from '../Breadcrumb/Breadcrumb';

import React from 'react';
import { Link } from 'react-router-dom';


function OrderDone(props) {
  const order = props.location.state;
  
  return (
    <div>
      {order && (
        <div className="wrapper order-wrapper"> 

          <Breadcrumb links={[{link: "/main-page", text: "Главная"}, {link: "#", text: "Оформление заказа"}]} />  

          <section className="order-done">
            <h2 className="order-done__title order-process__title">Заказ принят, спасибо!</h2>

            <div className="order-done__information order-info">
              <div className="order-info__item order-info__item_summ"> 
                <h3>Сумма заказа:</h3>
                <p>
                  {order.total}&nbsp;
                  <i className="fa fa-rub" aria-hidden="true"></i>
                </p>
              </div>

              <div className="order-info__item order-info__item_pay-form"> 
                <h3>Способ оплаты:</h3>
                <p>
                  {paymentTypes[order.paymentType].name}
                </p>
              </div>

              <div className="order-info__item order-info__item_customer-name"> 
                <h3>Имя клиента:</h3>
                <p>{order.name}</p>
              </div>

              <div className="order-info__item order-info__item_adress">
                <h3>Адрес доставки:</h3>
                <p>{order.address}</p>
              </div>

              <div className="order-info__item order-info__item_phone">
                <h3>Телефон:</h3>
                <p>{order.phone}</p>
              </div>
            </div>

            <p className="order-done__notice">
              Данные о заказе отправлены на адрес 
              <span> notbosaanymore@gmail.com.  </span>
            </p>

            <Link to="/">
              <button className="order-done__continue">продолжить покупки</button>
            </Link>            
          </section> 

        </div>
      )}    
    </div>
  );
}

export default OrderDone;