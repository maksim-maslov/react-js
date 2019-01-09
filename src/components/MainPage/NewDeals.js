import React, { Component } from 'react';

import { HashRouter, Route, Link, Nav, Switch } from 'react-router-dom';

class NewDeals extends Component {

  constructor(props) {
    super(props);

    this.firstPicIndex = 0;

    this.state = {
      categories: {},
      featured: [],
      activeItem: 1     
    };   

  }
  
  componentDidMount() {
    this.updateMenuItems();
    this.updateFeatured();    
  }

  componentWillReceiveProps() {
    this.updateMenuItems();
    this.updateFeatured();
  }

  updateMenuItems() {

    fetch(`https://neto-api.herokuapp.com/bosa-noga/featured`)
      .then(response => response.json())
      .then(data => { 

        const featuredCategoriesList = data.data.reduce((memo, el) => { 
          memo.find(element => element == el.categoryId)
          ? null
          : memo.push(el.categoryId);
          return memo;            
        }, []);

        const categories = this.props.categories.map(el => {          
          return featuredCategoriesList.find(element => element == el.id)
          ? {id: el.id, title: el.title}
          : null;
        })
        .filter(el => el != null);
        
        this.setState({ 
          categories: categories
        });

      }); 
     
  }

  changeFavorites(event) {  
    event.preventDefault(); 
    this.props.changeFavorites(event.currentTarget.dataset.id);    
  }

  updateFeatured(event) {

    this.position = 0; 

    this.setState({
      activeItem: 1
    });

    let categoryId = '';

    if (event) {
      event.preventDefault();
      categoryId = event.target.dataset.categoryid;
    } 

    fetch(`https://neto-api.herokuapp.com/bosa-noga/featured`)
      .then(response => response.json())
      .then(data => {

          let featured;

          if (categoryId) {
            featured = data.data.filter(el => el.categoryId == categoryId);
          } else {
            featured = data.data;
          }

          this.lastPicIndex = featured.length - 1;

          this.setState({ 
            featured: featured 
          });
                    
      });      
          
  }

  movePicture(event) {

    if (event.currentTarget.classList.contains('new-deals__arrow_left')) {

      this.position = this.position + 284 + 14;
      this.setState({
        activeItem: this.state.activeItem - 1
      });        
        
    } else if (event.currentTarget.classList.contains('new-deals__arrow_right')) {
     
      this.position = this.position - 284 - 14;        
      this.setState({
        activeItem: this.state.activeItem + 1
      });
      
    }
    
  }

  render() {
    const { categories, featured, activeItem } = this.state;
    const { favorites, favoritesIdList } = this.props;
    
    return(
      <section className="new-deals wave-bottom">
        <h2 className="h2">Новинки</h2>
        <div className="new-deals__menu">
          <ul className="new-deals__menu-items">
            {categories.length > 0 && categories.map((el, index) => 
              <li key={index} className="new-deals__menu-item">
                <a 
                  href="#" 
                  data-categoryid={el.id} 
                  onClick={this.updateFeatured.bind(this)} 
                >{el.title}</a>
              </li>                
            )}
          </ul>
        </div>
        {featured.length &&        
          <div>          
            <div className="new-deals__slider" >
              <div 
                className={`new-deals__arrow new-deals__arrow_left arrow 
                  ${activeItem - 1 === this.firstPicIndex 
                    ? 'hidden' 
                    : ''
                  }`
                }
                onClick={this.movePicture.bind(this)}
              ></div>
                <div className="new-deals__gallery">
                  <ul style={{marginLeft: this.position + 'px'}}>  
                    {featured.map((el, index) => {                       
                      return(
                        <li key={index}>
                          <Link to={`/product-card-desktop/${el.id}`}>
                            <div 
                              className={`new-deals__product 
                                ${index === activeItem 
                                  ? 'new-deals__product_active' 
                                  : ''
                                }
                                ${index === activeItem - 1 
                                  ? 'new-deals__product_first' 
                                  : ''
                                }
                                ${index === activeItem + 1 
                                  ? 'new-deals__product_last' 
                                  : ''
                                }`
                              }>
                              <img 
                                className="new-deals-product__pic" 
                                src={el.images[0]} 
                                alt={el.title}
                              />
                              {index === activeItem &&                      
                                <div 
                                  className={`new-deals__product_favorite 
                                    ${favoritesIdList.findIndex(element => element.id == el.id) === -1 
                                      ? '' 
                                      : 'favourite_chosen'
                                    }`
                                  } 
                                  data-id={el.id} 
                                  onClick={this.changeFavorites.bind(this)} 
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
                  ${activeItem + 1 === this.lastPicIndex 
                    ? 'hidden' 
                    : ''
                  }`
                } 
                onClick={this.movePicture.bind(this)}
              ></div>
            </div>          
            <div className="new-deals__product-info">
              <Link 
                to={`/product-card-desktop/${featured[activeItem]}`} 
                className="new-deals-product-info__title"
              >{featured[activeItem].title}</Link>
              <p>Производитель: 
                <span className="new-deals-product-info__brand">{featured[activeItem].brand}</span>
              </p>
              <h3 className="new-deals-product-info__price">{featured[activeItem].price} ₽</h3>
            </div>
          </div>
        }
      </section>            
    )
  }

}

export default NewDeals;