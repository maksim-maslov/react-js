import Page from './Page'

import React from 'react';


function PaginationPagesList({ page, pages, changePage }) {
  const pagesList = [];

  for (let c = 1; c <= pages; c++) {
    pagesList.push(<Page key={c} index={c} page={page} changePage={changePage} />);
  }
  
  return pagesList;
}  

export default PaginationPagesList;