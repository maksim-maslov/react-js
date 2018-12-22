import React, { Component } from 'react';

class Subscribe extends Component {
  constructor(props) {
    super(props)
    this.state = {
      subscribe: false
    }
  }

  handler() {
    this.setState({
      subscribe: !this.state.subscribe
    });
  }

  render() {
    return(
      <section className="subscribe">
          <div className="subscribe__wrapper">
              <h2 className="subscribe__title">подписаться на рассылку выгодных предложений</h2>
              {this.state.subscribe 
              ?
              <div className="subscribe__ok">Подписка оформлена! Спасибо!</div>
              :
              <form className="subscribe__radios" action="">
                  <label className="subscribe__radio_label">
                      <input className="subscribe__radio" type="radio" name="subscribe" value="women"/>
                      <div className="subscribe__radio_text">Женское</div>
                  </label>
                  <label className="subscribe__radio_label">
                      <input className="subscribe__radio" type="radio" name="subscribe" value="men"/>
                      <div className="subscribe__radio_text">Мужское</div>
                  </label>
                  <label className="subscribe__radio_label">
                      <input className="subscribe__radio" type="radio" name="subscribe" value="both" checked/>
                      <div className="subscribe__radio_text">Всё</div>
                  </label>
                  <input className="subscribe__email" type="email" placeholder="Ваш e-mail"/>
                  <input className="subscribe__submit" type="submit" value="ПОДПИСАТЬСЯ" onClick={this.handler.bind(this)} />
              </form>
              }
          </div>
      </section>
    );
  }
    
}

export default Subscribe;