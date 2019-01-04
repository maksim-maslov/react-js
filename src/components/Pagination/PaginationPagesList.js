import React, { Component } from 'react';

import Page from './Page'

const PaginationPagesList = ({pages, page, nextPage}) => {
  const pagesList = [];
  for (let c = 1; c <= pages; c++) {
    pagesList.push(<Page key={c} index={c} page={page} nextPage={nextPage} />)
  }
  return pagesList;
}  

export default PaginationPagesList;