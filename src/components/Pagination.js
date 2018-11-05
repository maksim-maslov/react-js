import React, { Component } from 'react';

import { HashRouter, Route, Link, Nav, Switch } from 'react-router-dom';

import PaginationPagesList from './PaginationPagesList';

const Pagination = ({pages, page, search}) => {
  return(
    <div className="product-catalogue__pagination">
      <div className="page-nav-wrapper">
        <div className="angle-back"><a href="#"></a></div>
        <ul>
          <PaginationPagesList pages={pages} page={page} search={search}/>
          {/* {pages && pages.map((el, index) => <li className={page == index ? "active" : ""}><Link to={{pathname: '/catalogue', search: `?categoryId=${search}&page[]=${index}`}}>{index}</Link></li>)} */}
            {/* <li className="active"><a href="#">1</a></li>
            <li><a href="#">2</a></li>
            <li><a href="#">3</a></li>
            <li><a href="#">4</a></li>
            <li><a href="#">5</a></li>
            <li><a href="">...</a></li>
            <li><a href="#">99</a></li> */}
        </ul>
        <div className="angle-forward"><a href="#"></a></div>
      </div>
    </div>        
  );
}

export default Pagination;

