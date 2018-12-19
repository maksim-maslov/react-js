import React, { Component } from 'react';

import Slider from './Slider';
import NewDeals from './NewDeals';
import SalesAndNews from './SalesAndNews';
import AboutUs from './AboutUs';

const MainPage = (props) => {
  return(
    <div className="container">  
      <Slider />
      <NewDeals updateFavorites={props.updateFavorites} categories={props.categories} />
      <SalesAndNews />
      <AboutUs />
    </div>
  );
}

export default MainPage;