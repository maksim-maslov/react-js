import React, { Component } from 'react';

import { HashRouter, Route, Link, Nav, Switch } from 'react-router-dom';

class BrowsedProducts extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      activeItem: 0
    };

    this.movePicture = this.movePicture.bind(this); 
  } 

  componentWillReceiveProps(newProps) {
    this.props = newProps; 
  } 

  movePicture(event, shift) {
    const ev = event.currentTarget;
    if (ev.classList.contains('overlooked-slider__arrow_left') || ev.classList.contains('overlooked-slider__arrow_right')) {  
      this.setState({
        activeItem: this.state.activeItem - (1 * shift)
      });
    }    
  }

  render() {
    const { activeItem } = this.state;
    const { browsedProducts } = this.props;
    this.position = -(activeItem * (185 + 14));

    return(
      <section className="product-catalogue__overlooked-slider">
        <h3>Вы смотрели:</h3>
        <div className="overlooked-slider">
          <div 
            className={`overlooked-slider__arrow overlooked-slider__arrow_left arrow 
              ${activeItem === 0 
                ? 'hidden' 
                : ''
              }`
            } 
            onClick={ev => this.movePicture(ev, 1)}
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
              ${browsedProducts.length < 5 || activeItem + 5 === browsedProducts.length 
                ? 'hidden' 
                : ''
              }`
            } 
            onClick={ev => this.movePicture(ev, -1)}
          >
          </div>                                 
        </div>
      </section>
    );

  }  
  
}

export default BrowsedProducts;