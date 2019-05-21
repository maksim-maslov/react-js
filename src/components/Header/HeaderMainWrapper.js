import logo from './img/header-logo.png';

import './css/HeaderMainWrapper.css';

import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';


class HeaderMainWrapper extends Component {
  constructor(props) {
    super(props);

    this.formData = '';
    this.search = {};

    this.state = {
      doRedirect: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleSubmit(event) {  
    event.preventDefault();  
    const { search } = this.formData;
    this.search = search.value;
    this.setState({doRedirect: true});
  }

  
  render() {   
    const { 
      basketVisibility, 
      profileVisibility, 
      searchVisibility, 
      updateBasketVisibility, 
      updateProfileVisibility, 
      updateSearchVisibility 
    } = this.props;
    const { doRedirect } = this.state;

    return(
      <div className="header-main__wrapper wrapper">
        <div className="header-main__phone">
          <a>+7 495 79 03 5 03</a>
          <p>Ежедневно: с 09-00 до 21-00</p>
        </div>

        <div className="header-main__logo">
          <Link to="/">
            <h1>
              <img src={logo} alt="logotype" />
            </h1>
          </Link>
          <p>Обувь и аксессуары для всей семьи</p>
        </div>

        <div className="header-main__profile">
          <div className="header-main__pics">
            <div className={`header-main__pic header-main__pic_search ${searchVisibility ? 'header-main__pic_search_is-hidden' : ''}`} 
                 onClick={updateSearchVisibility}>
            </div>

            <div className="header-main__pic_border"></div>

            <div className="header-main__pic header-main__pic_profile" 
                 onClick={updateProfileVisibility}>
              <div className={`header-main__pic_profile_menu ${profileVisibility ? 'header-main__pic_profile_menu_is-active' : ''}`}></div>
            </div>

            <div className="header-main__pic_border"></div>

            <div className="header-main__pic header-main__pic_basket" 
                 onClick={updateBasketVisibility}>
              <div className="header-main__pic_basket_full">1</div>
              <div className={`header-main__pic_basket_menu ${basketVisibility ? 'header-main__pic_basket_menu_is-active' : ''}`}></div>
            </div>
          </div>   

          <form className={`header-main__search ${searchVisibility ? 'header-main__search_active' : ''}`} 
                ref={element => this.formData = element} 
                onSubmit={this.handleSubmit}>
            <input placeholder="Поиск" name="search" />
            <i className="fa fa-search" aria-hidden="true"></i>
          </form>

          {doRedirect && <Redirect to={{pathname: "/catalogue", search: `search=${this.search}`}} />}

        </div>
      </div>
    );
  }  
}

export default HeaderMainWrapper;