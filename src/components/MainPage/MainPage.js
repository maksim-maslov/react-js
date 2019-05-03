import React, { Component } from 'react';

import Slider from './Slider';
import Featured from './Featured';
import SalesAndNews from './SalesAndNews';
import AboutUs from './AboutUs';

const MainPage = ({ categories, changeFavorites, favorites, favoritesIdList, updateFavorites }) => {
  return(
    <div className="container">  
      <Slider />
      <Featured 
        categories={categories} 
        changeFavorites={changeFavorites}        
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