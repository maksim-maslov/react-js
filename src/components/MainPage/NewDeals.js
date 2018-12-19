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

    // this.active = 1;

    // this.menuTitles = [
    //   'Мужская обувь',
    //   'Детская обувь',
    //   'аксессуары',
    //   'для дома'
    // ]
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
          // } else {
            // featured = data.data;
          // }
          this.setState({ 
            featured: featured 
          });
        }) 
    })

    // categoryId = event.target.dataset.categoryid;
     
  }


  addFavorites(event) {  
    // console.log('dsasgsdfhfgjndgjty67577')
    event.preventDefault(); 
    const favorite = event.target;
    const favoriteIdList = this.state.favoriteIdList;
    // console.log(event.currentTarget)
    
    if (favorite.classList.contains('favourite_chosen')) {
      // favoriteIdList = JSON.parse(localStorage.getItem('favorites'));
      const removeElementIndex = favoriteIdList.findIndex(el => el.id == event.currentTarget.dataset.id);
      favoriteIdList.splice(removeElementIndex, 1);
      favorite.classList.remove('favourite_chosen');
    } else {
      favoriteIdList.push({id: event.currentTarget.dataset.id});
      favorite.classList.add('favourite_chosen');
    }
    localStorage.favorites = JSON.stringify(favoriteIdList);
    this.state = {
      favoriteIdList: localStorage.getItem('favorites') ? JSON.parse(localStorage.getItem('favorites')) : []
    };
    // localStorage.favorites = this.state.favoriteIdList;

    // const favoritePic = event.currentTarget.querySelector('.favourite');
    // this.favoriteIdList = JSON.parse(localStorage.getItem('favorites'));
    // console.log(this.favoriteIdList);
    // this.favoriteIdList.shift();
    
    // if (!this.state.isFavorite) {
    //   console.log(this.favoriteIdList)
    //   this.favoriteIdList.push({id: this.props.product.id});
    //   localStorage.favorites = JSON.stringify(this.favoriteIdList);
    //   this.setState({isFavorite: !this.state.isFavorite});
    //   favoritePic.classList.add('favourite_chosen');
    //   // favorite.textContent = 'В избранном';
    // } else {
      // this.favoriteIdList = JSON.parse(localStorage.getItem('favorites'));
      // const removeElementIndex = this.favoriteIdList.findIndex(el => el.id == event.currentTarget.dataset.id);
      // // console.log('tyetytre', this.favoriteIdList, removeElementIndex, event.currentTarget.dataset.id)
      // // console.log('56575', this.favoriteIdList)
      // this.favoriteIdList.splice(removeElementIndex, 1);
      // console.log('56576', this.favoriteIdList)
      // this.state = {      
      //   favorites: this.favoriteIdList
      // };
      // localStorage.favorites = JSON.stringify(this.favoriteIdList);
      // favorite.textContent = 'В избранное';
      // this.setState({ isFavorite: !this.state.isFavorite });
      // favoritePic.classList.remove('favourite_chosen');
    // }
    this.props.updateFavorites();
    
    // favorite.textContent = favorite.textContent === 'В избранное' ? 'В избранном' : 'В избранное';
  }

  updateFeatured(event) {
    this.setState({
      featured: []
    });
    let categoryId = '';
    if (event) {
      console.log(event.target)
      event.preventDefault();
      categoryId = event.target.dataset.categoryid;
      // fetch(`https://neto-api.herokuapp.com/bosa-noga/featured?categoryId=${categoryId}`)
      //   .then(response => response.json())
      //   .then(data => {
          
      //     console.log('featured', featured)
      //     this.setState({ 
      //       featured: featured
      //     });
      //     this.firstPic = 0;
      //     this.lastPic = data.data.length - 1;
      //   });
      //   console.log(this.state.featured);
    } 
    // else {
        
    // }  
    // this.width = 130; // ширина изображения
    // this.count = 3; // количество изображений

    fetch(`https://neto-api.herokuapp.com/bosa-noga/featured`)
      .then(response => response.json())
      .then(data => {
        // if (data.data.length) {
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

          this.position = 0; // текущий сдвиг влево

          this.first = 0;
          this.last = 2;

          // console.log(this.first, this.last);
          
          this.listElements[this.first].querySelector('.new-deals__product').classList.add('new-deals__product_first');
          this.listElements[this.first + 1].querySelector('.new-deals__product').classList.add('new-deals__product_active');
          this.listElements[this.first + 2].querySelector('.new-deals__product').classList.add('new-deals__product_last');

          // this.active = 1;
          this.setState({
            active: this.first + 1
          })
          
        // }          
      });      
          
  }


  movePicture(event) {
    
    
    // console.log('event.currentTarget', this.state.favoriteIdList.findIndex(element => element.id == el.id))
    if (event.currentTarget.classList.contains('new-deals__arrow_left')) {
      if (this.last != this.firstPic + 2) {

        this.position = this.position + 284 + 14;
        this.list.style.marginLeft = this.position + 'px';

        this.last--;
        this.first--;
        // this.active--;
        this.setState({
          active: this.first + 1
        });
        // console.log(this.listElements)
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
        // this.active++;
        this.setState({
          active: this.first + 1
        });
        // console.log(this.listElements)
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
    // console.log('event.currentTarget', this.state.favoriteIdList.findIndex(element => element.id == 66))
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
                        return(
                          <li key={index}>
                            <Link to={`/product-card-desktop/${el.id}`}>
                              <div className="new-deals__product">
                                <img className="new-deals-product__pic" src={el.images[0]} alt={el.title}/>
                                {/* <a href="#"></a> */}
                                {index === this.state.active &&                                 
                                  <div className={`new-deals__product_favorite ${this.state.favoriteIdList.findIndex(element => element.id == el.id) === -1 ? '' : 'favourite_chosen'}`} data-id={el.id} onClick={this.addFavorites.bind(this)} >
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