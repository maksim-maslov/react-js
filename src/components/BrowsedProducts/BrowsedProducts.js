import React, { Component } from 'react';

import ListBrowsedProducts from './ListBrowsedProducts'; 

class BrowsedProducts extends Component {
  constructor(props) {
    super(props);
    
  }

  render() {
    return(
      <section className="product-catalogue__overlooked-slider">
        <h3>Вы смотрели:</h3>
        <div className="overlooked-slider">
          <div className="overlooked-slider__arrow overlooked-slider__arrow_left arrow"></div>
            {this.props.browsedProducts && <ListBrowsedProducts list={this.props.browsedProducts} />}
          <div className="overlooked-slider__arrow overlooked-slider__arrow_right arrow"></div>
        </div>
      </section>
    );

  }  
  
}

export default BrowsedProducts;