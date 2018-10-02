import React, { Component } from 'react';

import Slider from './components/MainPage/Slider';
import NewDeals from './components/MainPage/NewDeals';
import SalesAndNews from './components/MainPage/SalesAndNews';
import AboutUs from './components/MainPage/AboutUs';

const MainPage = () => {
  return(
    <div className="container">  
      <Slider />
      <NewDeals />
      <SalesAndNews />
      <AboutUs />
    </div>
  );
}

export default MainPage;