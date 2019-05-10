import './css/MainPage.css';

import React, { Component } from 'react';

import Slider from './Slider';
import NewDeals from './NewDeals';
import SalesAndNews from './SalesAndNews';
import AboutUs from './AboutUs';

const MainPage = ({ categories, changeFavorites, favorites, favoritesIdList, updateFavorites }) => {
  return(
    <div className="container">  
      <Slider />
      <NewDeals 
        categories={categories}       
        favorites={favorites} 
        favoritesIdList={favoritesIdList}
        updateFavorites={updateFavorites}         
      />
      <SalesAndNews />
      <AboutUs />
    </div>
  );
}

export default MainPage;