import React, { Component } from 'react';

import { HashRouter, Route, Link, Nav, Switch } from 'react-router-dom';

import ListNewDealsMenuItem from './ListNewDealsMenuItem';

class NewDeals extends Component {

  constructor(props) {
    super(props);

    this.state = {
      categories: this.props.categories,
      featured: [],
      active: 1,          
      favoriteIdList: localStorage.getItem('favorites') ? JSON.parse(localStorage.getItem('favorites')) : []      
    };

  }
  
  componentDidMount() {
    this.updateFeatured();    
  }

  updateMenuItems() {
    this.props.categories.map(el => {
      const categoryId = el.id;
      fetch(`https://neto-api.herokuapp.com/bosa-noga/featured`)
        .then(response => response.json())
        .then(data => { 
          const featured = data.data.filter(el => el.categoryId == categoryId);
          this.setState({ 
            featured: featured 
          });
        }) 
    })
     
  }

  changeFavorites(event) {  
    event.preventDefault(); 
    this.props.changeFavorites(event.currentTarget.dataset.id);    
  }

  updateFeatured(event) {
    this.setState({
      featured: []
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
            featured = data.data.filter(el => {
              return el.categoryId == categoryId;
            });
          } else {
            featured = data.data;
          }
          this.setState({ 
            featured: featured 
          });

          this.firstPic = 0;
          this.lastPic = data.data.length - 1;

          this.slider = document.querySelector('.new-deals__slider');      
          this.list = this.slider.querySelector('ul');
          this.listElements = this.slider.querySelectorAll('li');

          this.position = 0; 

          this.first = 0;
          this.last = 2;

          
          this.listElements[this.first].querySelector('.new-deals__product').classList.add('new-deals__product_first');
          this.listElements[this.first + 1].querySelector('.new-deals__product').classList.add('new-deals__product_active');
          this.listElements[this.first + 2].querySelector('.new-deals__product').classList.add('new-deals__product_last');

          this.setState({
            active: this.first + 1
          })
          
      });      
          
  }


  movePicture(event) {
    if (event.currentTarget.classList.contains('new-deals__arrow_left')) {
      if (this.last != this.firstPic + 2) {

        this.position = this.position + 284 + 14;
        this.list.style.marginLeft = this.position + 'px';

        this.last--;
        this.first--;
        this.setState({
          active: this.first + 1
        });
        this.listElements[this.last + 1].querySelector('.new-deals__product').classList.remove('new-deals__product_first');
        this.listElements[this.last].querySelector('.new-deals__product').classList.remove('new-deals__product_active');
        this.listElements[this.last - 1].querySelector('.new-deals__product').classList.remove('new-deals__product_last');
        this.listElements[this.last].querySelector('.new-deals__product').classList.add('new-deals__product_first');
        this.listElements[this.last - 1].querySelector('.new-deals__product').classList.add('new-deals__product_active');
        this.listElements[this.last - 2].querySelector('.new-deals__product').classList.add('new-deals__product_last');
      }          

    } else if (event.currentTarget.classList.contains('new-deals__arrow_right')) {

      if (this.first != this.lastPic - 2) {
        this.position = this.position - 284 - 14;
        this.list.style.marginLeft = this.position + 'px';
        this.first++;
        this.last++;
        this.setState({
          active: this.first + 1
        });
        this.listElements[this.first - 1].querySelector('.new-deals__product').classList.remove('new-deals__product_first');
        this.listElements[this.first].querySelector('.new-deals__product').classList.remove('new-deals__product_active');
        this.listElements[this.first + 1].querySelector('.new-deals__product').classList.remove('new-deals__product_last');
        this.listElements[this.first].querySelector('.new-deals__product').classList.add('new-deals__product_first');
        this.listElements[this.first + 1].querySelector('.new-deals__product').classList.add('new-deals__product_active');
        this.listElements[this.first + 2].querySelector('.new-deals__product').classList.add('new-deals__product_last');

      }
      
    }
    
  }

  render() {
    const { featured } = this.state;
    const categories = this.props.categories;
    return(
      <section className="new-deals wave-bottom">
        <h2 className="h2">Новинки</h2>
        <div className="new-deals__menu">
            <ul className="new-deals__menu-items">
              {categories.map((el, index) => 
                <li key={index} className="new-deals__menu-item">
                  <a href="#" data-categoryid={el.id} onClick={event => this.updateFeatured(event)} >{el.title}</a>
                </li>                
              )}
              {/* <li className="new-deals__menu-item new-deals__menu-item_active">
                  <a href="#">Женская обувь</a>
              </li> */}
              {/* <ListNewDealsMenuItem list={this.menuTitles} /> */}
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
        {this.state.featured.length &&
          <div>          
            <div className="new-deals__slider" >
              <div className="new-deals__arrow new-deals__arrow_left arrow" onClick={event => this.movePicture(event)}></div> 
                <div className="new-deals__gallery">
                  <ul>  
                    {
                      this.state.featured.map((el, index) => {  
                        // console.log('this.props14578', this.props)                      
                        return(
                          <li key={index}>
                            <Link to={`/product-card-desktop/${el.id}`}>
                              <div className="new-deals__product">
                                <img className="new-deals-product__pic" src={el.images[0]} alt={el.title}/>
                                {/* <a href="#"></a> */}
                                {index === this.state.active && this.props.favorites.hasOwnProperty('data') &&                           
                                  <div className={`new-deals__product_favorite ${this.props.favorites.data.findIndex(element => element.id == el.id) === -1 ? '' : 'favourite_chosen'}`} data-id={el.id} onClick={this.changeFavorites.bind(this)} >
                                  </div>
                                }
                              </div>
                            </Link>
                          </li>
                        );
                      })
                    } 
                    
                  </ul>
                </div>
              <div className="new-deals__arrow new-deals__arrow_right arrow" onClick={event => this.movePicture(event)}></div>
            </div>
          
            <div className="new-deals__product-info">
              <a href="product-card-desktop.html" className="new-deals-product-info__title">{this.state.featured[this.state.active].title}</a>
              <p>Производитель:
                <span className="new-deals-product-info__brand">{this.state.featured[this.state.active].brand}</span>
              </p>
              <h3 className="new-deals-product-info__price">{this.state.featured[this.state.active].price} ₽</h3>
            </div>
          </div>
        }
      </section>            
    )
  }

}

export default NewDeals;