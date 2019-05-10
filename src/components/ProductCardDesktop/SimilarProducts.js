import './css/SimilarProducts.css';

import React, { Component } from 'react';

import { HashRouter, Route, Link, Nav, Switch } from 'react-router-dom';

class SimilarProducts extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      first: 0
    };

  } 

  render() {
    const { first } = this.state;
    const { similarProducts } = this.props;
    this.position = -(first * (318 + 14));
    const last = similarProducts.length;    

    return(
      <section className="product-card__similar-products-slider">
        <h3>Похожие товары</h3>
        <div className="similar-products-slider">
          <div 
            className={`similar-products-slider__arrow similar-products-slider__arrow_left 
              ${first === 0 
                ? 'hidden' 
                : ''
              }`
            }  
            onClick={ev => this.setState({first: first - 1})}
          >
          </div>
            <div className="similar-products-slider__gallery">
              <ul style={{transform: `translate(${this.position}px)`}}>
                {similarProducts.map((el, index) => {
                  return(
                    <li key={index} >
                      <div className="similar-products-slider__item-list__item-card item">
                        <Link to={`/product-card-desktop/${el.id}`}>
                          <div className="similar-products-slider__item">
                            
                            <img 
                              src={el.images[0]} 
                              className={`similar-products-slider__item-pic`} 
                              alt={el.title}
                            />                          
                          
                          </div>
                        </Link>
                        <div className="similar-products-slider__item-desc">
                          <h4 className="similar-products-slider__item-name">{el.title}</h4>
                          <p className="similar-products-slider__item-producer"><span className="producer">{el.brand}</span></p>
                          <p className="similar-products-slider__item-price">{el.price}</p>
                        </div>    
                      </div> 
                    </li>                 
                  )
                })} 
              </ul>
            </div>
          <div 
            className={`similar-products-slider__arrow similar-products-slider__arrow_right 
              ${last < 3 || first + 3 === last
                ? 'hidden' 
                : ''
              }`
            } 
            onClick={ev => this.setState({first: first + 1})}
          >
          </div>                       
        </div>
      </section>
    );
  }
    
}

export default SimilarProducts;