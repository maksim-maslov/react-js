import React, { Component } from 'react';

import slider from '../js/slider.js';

import slide1 from '../img/slider.jpg';
import slide2 from '../img/slider180deg.jpeg';


class Slider extends Component {

    componentDidMount() {

        window.requestAnimationFrame = (function () { // для поддержки requestAnimationFrame всеми браузерами
            return window.requestAnimationFrame ||
                function (callback) {
                    return window.setTimeout(callback, 1000 / 60);
                };
        })();

        var f = document.querySelector('.slider__pictures'),
            a = f.getElementsByClassName('slider__image'),
            button = f.getElementsByClassName('slider__circles')[0].getElementsByClassName('slider__circle'),
            arrows = f.getElementsByClassName('slider__arrow');
        slider(f, a, button, '4000', '1000', arrows);

    }

    render() {
        return(
            <section className="slider">
                <div className="wrapper">
                    <div className="slider__pictures">
                    <a className="slider__image" href="#">
                        <img src={slide1} alt="slide picture"/>
                    </a>
                    <a className="slider__image" href="#">
                        <img src={slide2} alt="slide picture"/>
                    </a>
                    <a className="slider__image" href="#">
                        <img src={slide1} alt="slide picture"/>
                    </a>
                    <a className="slider__image" href="#">
                        <img src={slide2} alt="slide picture"/>
                    </a>
                    <div className="arrow slider__arrow slider__arrow_left"></div>
                    <div className="arrow slider__arrow slider__arrow_right"></div>
                    <div className="slider__circles">
                        <button className="slider__circle" value="0"></button>
                        <button className="slider__circle" value="1"></button>
                        <button className="slider__circle" value="2"></button>
                        <button className="slider__circle" value="3"></button>
                    </div>
                    <h2 className="h2">К весне готовы!</h2>
                    </div>
                </div>
            </section>
        );
    }    
}

export default Slider;