import './css/NewDeals.css';

import Loader from '../Loader/Loader';

import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class NewDeals extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      categoryId: props.featuredCategories[0].id, 
      featuredProducts: props.featuredProducts,
      featuredProductsFilter: props.featuredProducts.filter(el => el.categoryId == props.featuredCategories[0].id),
      first: 0 
    };  

    this.updateCategory = this.updateCategory.bind(this);    
    this.updateFavorites = this.updateFavorites.bind(this);
  }


  updateFavorites(event, id) {  
    event.preventDefault(); 
    this.props.updateFavorites(id);    
  }


  updateCategory(categoryId) {
    if (categoryId != this.state.categoryId) {
      this.setState({
        categoryId: categoryId, 
        featuredProductsFilter: this.state.featuredProducts.filter(el => el.categoryId == categoryId),
        first: 0
      });      
    }    
  }


  render() {
    const { first, featuredProductsFilter } = this.state;
    const { favoritesIdList, featuredCategories } = this.props;
    const last = featuredProductsFilter.length;      
    this.position = -(first * (284 + 14));  
    
    return(
      <section className="new-deals wave-bottom">
      
        <h2 className="h2">Новинки</h2>

        <div className="new-deals__menu">
          <ul className="new-deals__menu-items">

            {featuredCategories.map((el, index) => {
              return(
                <li key={index} className="new-deals__menu-item">
                  <a                   
                    onClick={ev => this.updateCategory(el.id)} 
                  >{el.title}</a>
                </li>
              );
            })}

          </ul>
        </div>

        <div>          
          <div className="new-deals__slider">
            <div 
              className={`new-deals__arrow new-deals__arrow_left arrow ${first === 0 ? 'hidden' : ''}`}
              onClick={() => this.setState({first: first - 1})}
            >
            </div>

            <div className="new-deals__gallery">
              <ul style={{transform: `translate(${this.position}px)`}}>  

                {featuredProductsFilter.map((el, index) => {                       
                  return(
                    <li key={index}>
                      <Link to={`/product-card-desktop/${el.id}`}>
                        <div 
                          className={`new-deals__product 
                            ${index === first + 1 ? 'new-deals__product_active' : ''}
                            ${index === first ? 'new-deals__product_first' : ''}
                            ${index === first + 2 ? 'new-deals__product_last' : ''}`
                          }
                        >
                          <img 
                            className="new-deals-product__pic" 
                            src={el.images[0]} 
                            alt={el.title}
                          />

                          {index === first + 1 &&                      
                            <div 
                              className={`new-deals__product_favorite 
                                ${favoritesIdList.findIndex(element => element.id == el.id) === -1 
                                  ? '' 
                                  : 'favourite_chosen'
                                }`
                              } 
                              onClick={ev => this.updateFavorites(ev, el.id)} 
                            >
                            </div>
                          }
                        </div>
                      </Link>
                    </li>
                  );
                })}

              </ul>
            </div>

            <div 
              className={`new-deals__arrow new-deals__arrow_right arrow ${last < 3 || first + 3 === last ? 'hidden' : ''}`} 
              onClick={() => this.setState({first: first + 1})}
            >
            </div>
          </div>   

          <div className="new-deals__product-info">
            <Link to={`/product-card-desktop/${featuredProductsFilter[first + 1].id}`} className="new-deals-product-info__title">
              {featuredProductsFilter[first + 1].title}
            </Link>
            <p> 
              <span className="new-deals-product-info__brand">{featuredProductsFilter[first + 1].brand}</span>
            </p>
            <h3 className="new-deals-product-info__price">{featuredProductsFilter[first + 1].price}&nbsp;<i className="fa fa-rub" aria-hidden="true"></i></h3>
          </div>

        </div>
      </section> 
    )
  }
}

export default NewDeals;