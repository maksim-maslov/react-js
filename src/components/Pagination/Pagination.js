import React, { Component } from 'react';

import { HashRouter, Route, Link, Nav, Switch } from 'react-router-dom';

import PaginationPagesList from './PaginationPagesList';

const Pagination = ({pages, page, nextPage}) => {
  return(
    <div className="product-catalogue__pagination">
      <div className="page-nav-wrapper">
        <div className={`angle-back ${page != 1 ? '' : 'hidden'}`} ><a onClick={() => nextPage(page - 1)}></a></div>
        <ul>
          <PaginationPagesList pages={pages} page={page} nextPage={nextPage} />          
        </ul>
        <div className={`angle-forward ${page != pages ? '' : 'hidden'}`} ><a onClick={() => nextPage(page + 1)}></a></div>
      </div>
    </div>        
  );
}

export default Pagination;

