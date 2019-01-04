import React, { Component } from 'react';

import { HashRouter, Route, Link, Nav, Switch } from 'react-router-dom';

class ListItemCard extends Component {
  constructor(props) {
    super(props);

    this.state = {      
      favoriteIdList: localStorage.getItem('favorites') ? JSON.parse(localStorage.getItem('favorites')) : []
    };
  
  }

  removeFavorites(event) {  
    event.preventDefault(); 
    const favorite = event.target;
    const favoriteIdList = this.state.favoriteIdList;
    if (favorite.classList.contains('favourite_chosen')) {
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
   
    this.props.updateFavorites();
    
  }

  render() {
    if (!this.props.list) {
      return false;
    }
    return this.props.list.map((el, index) => {
      return(
        <Link to={`/product-card-desktop/${el.id}`} className="item-list__item-card item">
          <div className="item-pic"><img className={`item-pic-${index + 1}`} src={el.images[0]} alt={el.title}/>
            <div className="product-catalogue__product_favorite">
              <p className={ this.state.favoriteIdList.findIndex(element => element.id == el.id) === -1 ? '' : 'favourite_chosen' } data-id={el.id} onClick={this.removeFavorites.bind(this)} ></p>
            </div>
            {/* <div className="arrow arrow_left"></div>
            <div className="arrow arrow_right"></div> */}
          </div>
          <div className="item-desc">
            <h4 className="item-name">{el.title}</h4>
            <p className="item-producer">Производитель: <span className="producer">{el.brand}</span></p>
            <p className="item-price">{el.price}</p>
            {/* <div className="sizes">
            <p className="sizes__title">Размеры в наличии:</p>
            <p className="sizes__avalible">36, 37, 38, 39, 40, 41, 42</p>
            </div> */}
          </div>
        </Link>            
      )
    })
  }

  
}

export default ListItemCard;