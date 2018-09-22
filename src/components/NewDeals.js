import React, { Component } from 'react';

import ListNewDealsMenuItem from './ListNewDealsMenuItem';


class NewDeals extends Component {

  constructor(props) {
    super(props);

    this.state = {
      favorite: []
    };

    this.menuTitles = [
      'Мужская обувь',
      'Детская обувь',
      'аксессуары',
      'для дома'
    ]
  }
  
  componentDidMount() {
    fetch('https://neto-api.herokuapp.com/bosa-noga/featured')
      .then(response => response.json())
      .then(data => {this.setState({ featured: data.data })});
  }

  render() {
    const { featured } = this.state;
    return(
      <section className="new-deals wave-bottom">
        <h2 className="h2">Новинки</h2>
        <div className="new-deals__menu">
            <ul className="new-deals__menu-items">
              <li className="new-deals__menu-item new-deals__menu-item_active">
                  <a href="#">Женская обувь</a>
              </li>
              <ListNewDealsMenuItem list={this.menuTitles} />
              {/* <li className="new-deals__menu-item">
                  <a href="#">Мужская обувь</a>
              </li>
              <li className="new-deals__menu-item">
                  <a href="#">Детская обувь</a>
              </li>
              <li className="new-deals__menu-item">
                  <a href="#">аксессуары</a>
              </li>
              <li className="new-deals__menu-item">
                  <a href="#">для дома</a>
              </li> */}
            </ul>
        </div>
        <div className="new-deals__slider">
          <div className="new-deals__arrow new-deals__arrow_left arrow"></div>
          <div className="new-deals__product new-deals__product_first">
          <a href="#"></a>
          </div>

          <div className="new-deals__product new-deals__product_active">
          <a href="catalogue.html"></a>
          <div className="new-deals__product_favorite"></div>
          </div>
          <div className="new-deals__product new-deals__product_last">
          <a href="#"></a>
          </div>
          <div className="new-deals__arrow new-deals__arrow_right arrow"></div>
        </div>
        <div className="new-deals__product-info">
          <a href="product-card-desktop.html" className="h3">Босоножки женские</a>
          <p>Производитель:
          <span>Damlax</span>
          </p>
          <h3 className="h3">5 950 ₽</h3>
        </div>
      </section>            
    )
  }

}

export default NewDeals;