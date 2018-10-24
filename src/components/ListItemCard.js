import React, { Component } from 'react';

import { HashRouter, Route, Link, Nav, NavLink, Switch } from 'react-router-dom';

class ListItemCard extends Component {
  constructor(props) {
    super(props);

    // this.favoriteIdList = props.favorites;
    // this.favoriteIdList = localStorage.getItem('favorites') ? JSON.parse(localStorage.getItem('favorites')) : [];
    // console.log('array', this.favoriteIdList)

    this.state = {      
      favoriteIdList: localStorage.getItem('favorites') ? JSON.parse(localStorage.getItem('favorites')) : []
    };
  
  }

  // compnentWillReceiveProps(newProps) {
  //   this.state = {
  //     favorites: newProps.list
  //   }
  // }


  removeFavorites(event) {  
    event.preventDefault(); 
    const favorite = event.target;
    const favoriteIdList = this.state.favoriteIdList;
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

  render() {
    console.log('lastrender', this.props)
    if (!this.props.list) {
      return false;
    }
    return this.props.list.map((el, index) => {
      return(
        <NavLink to={`/product-card-desktop/${el.id}`} className="item-list__item-card item">
          <div className="item-pic"><img className={`item-pic-${index + 1}`} src={el.images[0]} alt={el.title}/>
            <div className="product-catalogue__product_favorite">
              <p className={ this.state.favoriteIdList.findIndex(element => element.id == el.id) === -1 ? '' : 'favourite_chosen' } data-id={el.id} onClick={this.removeFavorites.bind(this)} ></p>
            </div>
            <div className="arrow arrow_left"></div>
            <div className="arrow arrow_right"></div>
          </div>
          <div className="item-desc">
            <h4 className="item-name">{el.title}</h4>
            <p className="item-producer">Производитель: <span className="producer">{el.brand}</span></p>
            <p className="item-price">{el.price}</p>
            <div className="sizes">
            <p className="sizes__title">Размеры в наличии:</p>
            <p className="sizes__avalible">36, 37, 38, 39, 40, 41, 42</p>
            </div>
          </div>
        </NavLink>            
      )
    })
  }

  
}

export default ListItemCard;