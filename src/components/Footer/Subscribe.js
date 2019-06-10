import './css/Subscribe.css';

import React, { Component } from 'react';

class Subscribe extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      subscribe: false,
      isValidEmail: false
    };

    this.validateEmail = this.validateEmail.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleSubmit(event) {
    event.preventDefault();
    const { isValidEmail, subscribe } = this.state;

    if (isValidEmail) {
      this.setState({subscribe: !subscribe});
    } else {
      return false;
    }
  }

  
  validateEmail(event) {
    const email = event.currentTarget.value;

    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)
    ? this.setState({isValidEmail: true})
    : this.setState({isValidEmail: false});
  }


  render() {
    const { isValidEmail } = this.state;

    return (
      <section className="subscribe">
        <div className="subscribe__wrapper">

          <h2 className="subscribe__title">Подписаться на рассылку выгодных предложений</h2>

          {this.state.subscribe 
          ?  <div className="subscribe__done">Подписка оформлена! Спасибо!</div>
          : (
            <form className="subscribe__radios" 
                  action="" 
                  onSubmit={this.handleSubmit}>
              <label className="subscribe__radio-label">
                <input className="subscribe__radio" type="radio" name="subscribe" value="women" />
                <div className="subscribe__radio-text">Женское</div>
              </label>
              <label className="subscribe__radio-label">
                <input className="subscribe__radio" type="radio" name="subscribe" value="men" />
                <div className="subscribe__radio-text">Мужское</div>
              </label>
              <label className="subscribe__radio-label">
                <input className="subscribe__radio" type="radio" name="subscribe" value="both" defaultChecked />
                <div className="subscribe__radio-text">Всё</div>
              </label>
              <input className="subscribe__email" 
                     type="email" 
                     placeholder="Ваш e-mail" 
                     onChange={this.validateEmail} />
              <input className={`subscribe__submit ${isValidEmail ? '': 'subscribe__submit_disabled'}`} 
                     type="submit" 
                     value="ПОДПИСАТЬСЯ" />
            </form>
          )}

        </div>
      </section>
    );
  }    
}

export default Subscribe;