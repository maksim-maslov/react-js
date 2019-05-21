import './css/Pagination.css';

import PaginationPagesList from './PaginationPagesList';

import React from 'react';


function Pagination({ pages, page, changePage }) {

  const handlerClick = page => {
    const timerId = setInterval(() => {document.querySelector('html').scrollTop -= 200}, 4);    
    setTimeout(() => clearInterval(timerId), 500);
    changePage(page);
  }

  return (
    <div className="product-catalogue__pagination">
      <div className="page-nav-wrapper">

        <div className={`angle-back ${page !== 1 ? '' : 'hidden'}`}>
          <a onClick={() => handlerClick(page - 1)}>←</a>
        </div>

        <ul>
          <PaginationPagesList 
            page={page}           
            pages={pages} 
            changePage={handlerClick} 
          />          
        </ul>

        <div className={`angle-forward ${page !== pages ? '' : 'hidden'}`}>
          <a onClick={() => handlerClick(page + 1)}>→</a>
        </div>

      </div>
    </div>        
  );  
}

export default Pagination;

