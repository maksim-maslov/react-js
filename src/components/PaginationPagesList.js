import React, { Component } from 'react';

import Page from './Page'

const PaginationPagesList = ({pages, page, categoryId}) => {
  const pagesList = [];
  for (let c = 1; c <= pages; c++) {
    pagesList.push(<Page key={c} index={c} page={page} categoryId={categoryId} />)
  }
  return pagesList;
}  

export default PaginationPagesList;