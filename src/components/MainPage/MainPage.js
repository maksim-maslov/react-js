import React, { Component } from 'react';

import Slider from './Slider';
import NewDeals from './NewDeals';
import SalesAndNews from './SalesAndNews';
import AboutUs from './AboutUs';

const MainPage = ({updateFavorites, categories, favorites, changeFavorites}) => {
  return(
    <div className="container">  
      <Slider />
      <NewDeals updateFavorites={updateFavorites} categories={categories} favorites={favorites} changeFavorites={changeFavorites} />
      <SalesAndNews />
      <AboutUs />
    </div>
  );
}

export default MainPage;