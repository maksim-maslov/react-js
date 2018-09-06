import React, { Component } from 'react';

import Slider from './components/Slider';
import NewDeals from './components/NewDeals';
import SalesAndNews from './components/SalesAndNews';
import AboutUs from './components/AboutUs';


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