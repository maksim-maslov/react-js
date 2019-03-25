import React, { Component } from 'react';

import { HashRouter, Route, Link, Nav, Switch } from 'react-router-dom';

class NewDeals extends Component {

  constructor(props) {
    super(props);

    this.state = {
      categories: {},
      featured: [],
      activeItem: 0   
    };   

    this.movePicture = this.movePicture.bind(this);
    this.changeFavorites = this.changeFavorites.bind(this);
    this.updateFeatured = this.updateFeatured.bind(this);

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

    fetch(`/featured`)
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

  changeFavorites(event, id) {  
    event.preventDefault(); 
    this.props.changeFavorites(id);    
  }

  updateFeatured(event, categoryid) {

    this.setState({
      activeItem: this.state.activeItem
    });

    let categoryId = '';

    if (event) {
      event.preventDefault();
      categoryId = categoryid;
    } 

    fetch(`/featured`)
      .then(response => response.json())
      .then(data => {

          let featured;

          if (categoryId) {
            featured = data.data.filter(el => el.categoryId == categoryId);
          } else {
            featured = data.data;
          }

          this.setState({ 
            featured: featured 
          });
                    
      });      
          
  }

  movePicture(event, shift) {

    const ev = event.currentTarget;

    if (ev.classList.contains('new-deals__arrow_left') || ev.classList.contains('new-deals__arrow_right')) {     
      this.setState({
        activeItem: this.state.activeItem - (1 * shift)
      });
    }
    
  }

  render() {
    const { categories, featured, activeItem } = this.state;
    const { favorites, favoritesIdList } = this.props;
    this.position = -(activeItem * (284 + 14));    
    
    return(
      <section className="new-deals wave-bottom">
        <h2 className="h2">Новинки</h2>
        <div className="new-deals__menu">
          <ul className="new-deals__menu-items">
            {categories.length && categories.map((el, index) => 
              <li key={index} className="new-deals__menu-item">
                <a 
                  href="#" 
                  onClick={ev => this.updateFeatured(ev, el.id)} 
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
                  ${activeItem === 0 
                    ? 'hidden' 
                    : ''
                  }`
                }
                onClick={ev => this.movePicture(ev, 1)}
              >
              </div>
              <div className="new-deals__gallery">
                <ul style={{marginLeft: this.position + 'px'}}>  
                  {featured.map((el, index) => {                       
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
                                onClick={ev => this.changeFavorites(ev, el.id)} 
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
                  ${featured.length < 3 || activeItem + 3 === featured.length
                    ? 'hidden' 
                    : ''
                  }`
                } 
                onClick={ev => this.movePicture(ev, -1)}
              >
              </div>
            </div>          
            <div className="new-deals__product-info">
              <Link 
                to={`/product-card-desktop/${featured[activeItem + 1]}`} 
                className="new-deals-product-info__title"
              >{featured[activeItem + 1].title}
              </Link>
              <p>Производитель: 
                <span className="new-deals-product-info__brand">{featured[activeItem + 1].brand}</span>
              </p>
              <h3 className="new-deals-product-info__price">{featured[activeItem + 1].price} ₽</h3>
            </div>
          </div>
        }
      </section>            
    )
  }

}

export default NewDeals;