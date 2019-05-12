import './css/MainPage.css';

import AboutUs from './AboutUs';
import NewDeals from './NewDeals';
import Slider from './Slider';
import SalesAndNews from './SalesAndNews';

import React from 'react';


const MainPage = ({ favoritesIdList, featuredCategories, featuredProducts, updateFavorites }) => {
  return(
    <div className="container">  
      <Slider />
      <NewDeals 
        favoritesIdList={favoritesIdList}
        featuredCategories={featuredCategories} 
        featuredProducts={featuredProducts}  
        updateFavorites={updateFavorites}         
      />
      <SalesAndNews />
      <AboutUs />
    </div>
  );
}

export default MainPage;