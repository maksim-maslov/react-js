import './css/Subscribe.css';

import React, { Component } from 'react';

class Subscribe extends Component {
  constructor(props) {
    super(props)
    this.state = {
      subscribe: false,
      isValidEmail: false
    }

    this.subscribe = this.subscribe.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
  }


  subscribe(event) {
    event.preventDefault();

    if (this.state.isValidEmail) {

      this.setState({subscribe: !this.state.subscribe});
    } else {

      return false;
    }
  }

  
  validateEmail(email) {

    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)
    ? this.setState({isValidEmail: true})
    : this.setState({isValidEmail: false});

  }


  render() {
    const { isValidEmail } = this.state;

    return(
      <section className="subscribe">
        <div className="subscribe__wrapper">

          <h2 className="subscribe__title">Подписаться на рассылку выгодных предложений</h2>

          {this.state.subscribe 
          ?  <div className="subscribe__ok">Подписка оформлена! Спасибо!</div>
          :  <form className="subscribe__radios" action="" onSubmit={ev => this.subscribe(ev)}>
              <label className="subscribe__radio_label">
                <input className="subscribe__radio" type="radio" name="subscribe" value="women" />
                <div className="subscribe__radio_text">Женское</div>
              </label>
              <label className="subscribe__radio_label">
                <input className="subscribe__radio" type="radio" name="subscribe" value="men" />
                <div className="subscribe__radio_text">Мужское</div>
              </label>
              <label className="subscribe__radio_label">
                <input className="subscribe__radio" type="radio" name="subscribe" value="both" checked/>
                <div className="subscribe__radio_text">Всё</div>
              </label>
              <input 
                className="subscribe__email" 
                type="email" 
                placeholder="Ваш e-mail" 
                onChange={ev => this.validateEmail(ev.currentTarget.value)} 
              />
              <input 
                className={`subscribe__submit 
                  ${
                    isValidEmail 
                    ? '' 
                    : 'subscribe__submit_disabled'
                  }`
                } 
                type="submit" 
                value="ПОДПИСАТЬСЯ" 
              />
            </form>
          }

        </div>
      </section>
    );
  }    
}

export default Subscribe;