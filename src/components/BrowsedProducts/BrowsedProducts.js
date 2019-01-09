import React, { Component } from 'react';

import { HashRouter, Route, Link, Nav, Switch } from 'react-router-dom';

class BrowsedProducts extends Component {
  constructor(props) {
    super(props);
    
    this.firstPicIndex = 0;
    this.init(props);

    this.state = {
      activeItem: 1
    }; 

    this.movePicture = this.movePicture.bind(this); 
  } 

  componentWillReceiveProps(newProps) {
    this.init(newProps);
    this.setState({
      activeItem: 1
    }); 
  } 
  
  init(props) {
    this.position = 0; 
    this.lastPicIndex = props.browsedProducts.length - 1;
  }

  movePicture(event) {

    const ev = event.currentTarget;

    if (ev.classList.contains('overlooked-slider__arrow_left') || ev.classList.contains('overlooked-slider__arrow_right')) {
      const shift = ev.classList.contains('overlooked-slider__arrow_left')
      ? 1
      : -1;        
      this.position = this.position + ((185 + 14) * shift);        
      this.setState({
        activeItem: this.state.activeItem - (1 * shift)
      });
    }
    
  }

  render() {
    const { activeItem } = this.state;
    const { browsedProducts } = this.props;
    return(
      <section className="product-catalogue__overlooked-slider">
        <h3>Вы смотрели:</h3>
        <div className="overlooked-slider">
          <div 
            className={`overlooked-slider__arrow overlooked-slider__arrow_left arrow 
              ${activeItem - 1 === this.firstPicIndex 
                ? 'hidden' 
                : ''
              }`
            } 
            onClick={this.movePicture}
          >
          </div>
            <div className="overlooked-slider__gallery">
              <ul style={{marginLeft: this.position + 'px'}}>
                {browsedProducts.map((el, index) => {
                  return(
                    <li key={index}>
                      <Link to={`/product-card-desktop/${el.id}`}>
                        <div className={`overlooked-slider__item`}>                        
                          <img 
                            src={el.images[0]} 
                            className={`overlooked-slider__item-pic`} 
                            alt={el.title}
                          />
                        </div>  
                      </Link> 
                    </li>             
                  )
                })}
              </ul>
            </div>
          <div 
            className={`overlooked-slider__arrow overlooked-slider__arrow_right arrow 
              ${browsedProducts.length < 5 || activeItem + 3 == this.lastPicIndex 
                ? 'hidden' 
                : ''
              }`
            } 
            onClick={this.movePicture}
          >
          </div>                                 
        </div>
      </section>
    );

  }  
  
}

export default BrowsedProducts;