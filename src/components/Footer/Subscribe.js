import React, { Component } from 'react';

const Subscribe = () => {
    return(
        <section className="subscribe">
            <div className="subscribe__wrapper">
                <h2 className="subscribe__title">подписаться на рассылку выгодных предложений</h2>
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
                        <input className="subscribe__radio" type="radio" name="subscribe" value="both" checked=""/>
                        <div className="subscribe__radio_text">Всё</div>
                    </label>
                    <input className="subscribe__email" type="email" placeholder="Ваш e-mail"/>
                    <input className="subscribe__submit" type="submit" value="ПОДПИСАТЬСЯ"/>
                </form>
            </div>
        </section>
    );
}

export default Subscribe;