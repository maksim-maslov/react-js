import './css/NewDeals.css';

import Loader from '../Loader/Loader';

import React, { Component } from 'react';

import { HashRouter, Route, Link, Nav, Switch } from 'react-router-dom';

class NewDeals extends Component {

  constructor(props) {
    super(props);

    this.state = {
      featuredCategories: [],
      featuredProducts: [],
      categoryId: '',      
      activeItem: 0   
    };  

    this.updateFavorites = this.updateFavorites.bind(this);
    this.updateCategory = this.updateCategory.bind(this);

  }

  
  componentDidMount() {
    this.props.categories.length && this.getFeatured();
  }

  componentWillReceiveProps(newProps) {

    if (newProps.categories.length != this.props.categories.length) {
      this.props = newProps;
      this.props.categories.length && this.getFeatured();
    }

  }

  filterArrayOnValue(array, valueToCheck) {
    const result = array.reduce((memo, el) => {
      memo[el[valueToCheck]] = true;
      return memo;
    }, {});
    return Object.keys(result); 
  }


  getFeatured() {

    const { categories } = this.props; 

    fetch(`https://api-neto.herokuapp.com/bosa-noga/featured`)
      .then(response => response.json())
      .then(data => {
        const featuredCategoryIds = this.filterArrayOnValue(data.data, 'categoryId');
        const featuredCategories = categories.filter(el => featuredCategoryIds.includes(String(el.id)));
        this.setState({
          featuredCategories: featuredCategories,
          categoryId: featuredCategories[0].id,
          featuredProducts: data.data
        });
      });

  }

  updateFavorites(event, id) {  
    event.preventDefault(); 
    this.props.updateFavorites(id);    
  }

  updateCategory(categoryId) {
    if (categoryId != this.state.categoryId) {
      this.setState({
        categoryId: categoryId, 
        activeItem: 0
      });      
    }    
  }

  render() {
    const { featuredCategories, categoryId, activeItem } = this.state;
    const { favoritesIdList } = this.props;
    const featuredProducts = this.state.featuredProducts.filter(el => el.categoryId == categoryId);
    this.position = -(activeItem * (284 + 14));    
    
    return(
      featuredProducts.length
      ?
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
          <div className="new-deals__slider" >
            <div 
              className={`new-deals__arrow new-deals__arrow_left arrow 
                ${activeItem === 0 
                  ? 'hidden' 
                  : ''
                }`
              }
              onClick={ev => this.setState({activeItem: activeItem - 1})}
            >
            </div>
            <div className="new-deals__gallery">
              <ul style={{transform: `translate(${this.position}px)`}}>  
                {featuredProducts.map((el, index) => {                       
                  return(
                    <li key={index}>
                      <Link to={`/product-card-desktop/${el.id}`}>
                        <div 
                          className={`new-deals__product 
                            ${index === activeItem + 1 
                              ? 'new-deals__product_active' 
                              : ''
                            }
                            ${index === activeItem 
                              ? 'new-deals__product_first' 
                              : ''
                            }
                            ${index === activeItem + 2 
                              ? 'new-deals__product_last' 
                              : ''
                            }`
                          }>
                          <img 
                            className="new-deals-product__pic" 
                            src={el.images[0]} 
                            alt={el.title}
                          />
                          {index === activeItem + 1 &&                      
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
              className={`new-deals__arrow new-deals__arrow_right arrow 
                ${featuredProducts.length < 3 || activeItem + 3 === featuredProducts.length
                  ? 'hidden' 
                  : ''
                }`
              } 
              onClick={ev => this.setState({activeItem: activeItem + 1})}
            >
            </div>
          </div>          
          <div className="new-deals__product-info">
            <Link to={`/product-card-desktop/${featuredProducts[activeItem + 1].id}`} className="new-deals-product-info__title"
            >
              {featuredProducts[activeItem + 1].title}
            </Link>
            <p> 
              <span className="new-deals-product-info__brand">{featuredProducts[activeItem + 1].brand}</span>
            </p>
            <h3 className="new-deals-product-info__price">{featuredProducts[activeItem + 1].price} ₽</h3>
          </div>
        </div>
      </section> 

      : <Loader />     

    )
  }

}

export default NewDeals;