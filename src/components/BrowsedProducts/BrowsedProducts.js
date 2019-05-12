import './css/BrowsedProducts.css';

import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class BrowsedProducts extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      first: 0
    };
  } 


  render() {
    const { first } = this.state;
    const { browsedProducts } = this.props;
    const last = browsedProducts.length;    
    this.position = -(first * (185 + 14));

    return(
      <section className="product__overlooked-slider">
        <h3>Вы смотрели</h3>
        <div className="overlooked-slider">

          <div 
            className={`overlooked-slider__arrow overlooked-slider__arrow_left ${first === 0 ? 'hidden' : ''}`} 
            onClick={() => this.setState({first: first - 1})}
          >
          </div>

          <div className="overlooked-slider__gallery">
            <ul style={{transform: `translate(${this.position}px)`}}>

              {browsedProducts.map((el, index) => {
                return(
                  <li key={index}>

                    <Link to={`/product-card-desktop/${el.id}`}>
                      <div className="overlooked-slider__item">                        
                        <img 
                          src={el.images[0]} 
                          className="overlooked-slider__item-pic" 
                          alt={el.title}
                        />
                      </div>  
                    </Link> 

                  </li>             
                );              
              })}

            </ul>
          </div>

          <div 
            className={`overlooked-slider__arrow overlooked-slider__arrow_right ${last < 5 || first + 5 === last ? 'hidden' : ''}`} 
            onClick={() => this.setState({first: first + 1})}
          >
          </div> 

        </div>
      </section>
    );
  }   
}

export default BrowsedProducts;