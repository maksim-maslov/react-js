import Page from './Page'

import React from 'react';


const PaginationPagesList = ({ pages, page, changePage }) => {
  const pagesList = [];

  for (let c = 1; c <= pages; c++) {
    pagesList.push(<Page key={c} index={c} page={page} changePage={changePage} />);
  }
  
  return pagesList;
}  

export default PaginationPagesList;