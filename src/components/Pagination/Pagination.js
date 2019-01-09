import React, { Component } from 'react';

import { HashRouter, Route, Link, Nav, Switch } from 'react-router-dom';

import PaginationPagesList from './PaginationPagesList';

class Pagination extends Component {
  constructor(props) {
    super(props);

    this.changePage = this.changePage.bind(this);
  }


  changePage(page) {
    const timerId = setInterval(() => {document.querySelector('html').scrollTop -= 200}, 10);    
    setTimeout(() => clearInterval(timerId), 500);
    this.props.changePage(page);
  }

  render() {
    const  {pages, page, changePage } = this.props;
    return(
      <div className="product-catalogue__pagination">
        <div className="page-nav-wrapper">
          <div className={`angle-back ${page != 1 ? '' : 'hidden'}`} ><a onClick={() => this.changePage(page - 1)}></a></div>
          <ul>
            <PaginationPagesList pages={pages} page={page} changePage={this.changePage} />          
          </ul>
          <div className={`angle-forward ${page != pages ? '' : 'hidden'}`} ><a onClick={() => this.changePage(page + 1)}></a></div>
        </div>
      </div>        
    );
  }

  
}

export default Pagination;

