import './css/Page.css';

import React from 'react';


const Page = ({ index, page, changePage }) => {
  return(
    <li className={page == index ? 'active' : ''}>
      {page == index 
      ? page 
      : <a onClick={() => changePage(index)}>{index}</a>}
    </li>
  );
} 

export default Page;