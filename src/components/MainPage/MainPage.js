import React, { Component } from 'react';

import Slider from './Slider';
import NewDeals from './NewDeals';
import SalesAndNews from './SalesAndNews';
import AboutUs from './AboutUs';

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