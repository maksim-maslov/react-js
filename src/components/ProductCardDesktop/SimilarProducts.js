import React, { Component } from 'react';

import { HashRouter, Route, Link, Nav, Switch } from 'react-router-dom';

class SimilarProducts extends Component {
  constructor(props) {
    super(props);

    this.firstPicIndex = 0;
    this.position = 0; 
    this.lastPicIndex = props.similarProducts.length - 1;

    this.state = {
      activeItem: 1
    }
    
  } 

  componentWillReceiveProps(newProps) {
    this.position = 0; 
    this.lastPicIndex = newProps.similarProducts.length - 1;
    this.setState({
      activeItem: 1
    });
  }  
  
  movePicture(event) {

    const ev = event.currentTarget;

    if (ev.classList.contains('similar-products-slider__arrow_left') || ev.classList.contains('similar-products-slider__arrow_right')) {
      const shift = ev.classList.contains('similar-products-slider__arrow_left')
      ? 1
      : -1;        
      this.position = this.position + ((318 + 14) * shift);        
      this.setState({
        activeItem: this.state.activeItem - (1 * shift)
      });
    }
    
  }

  render() {
    const { activeItem } = this.state;
    const { similarProducts } = this.props;

    return(
      <section className="product-card__similar-products-slider">
        <h3>Похожие товары:</h3>
        <div className="similar-products-slider">
          <div 
            className={`similar-products-slider__arrow similar-products-slider__arrow_left arrow 
              ${activeItem - 1 == this.firstPicIndex 
                ? 'hidden' 
                : ''
              }`
            }  
            onClick={this.movePicture.bind(this)}
          >
          </div>
            <div className="similar-products-slider__gallery">
              <ul style={{marginLeft: this.position + 'px'}}>
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
                          <p className="similar-products-slider__item-producer">Производитель: <span className="producer">{el.brand}</span></p>
                          <p className="similar-products-slider__item-price">{el.price}</p>
                        </div>    
                      </div> 
                    </li>                 
                  )
                })} 
              </ul>
            </div>
          <div 
            className={`similar-products-slider__arrow similar-products-slider__arrow_right arrow 
              ${similarProducts.length < 3 || activeItem + 1 === this.lastPicIndex 
                ? 'hidden' 
                : ''
              }`
            } 
            onClick={this.movePicture.bind(this)}
          >
          </div>                       
        </div>
      </section>
    );
  }
    
}

export default SimilarProducts;