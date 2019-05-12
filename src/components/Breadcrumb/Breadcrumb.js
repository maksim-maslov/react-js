import './css/BreadCrumb.css';

import React from 'react';
import { Link } from 'react-router-dom';


const Breadcrumb = ({ links }) => {
  return(
    <div className="site-path">
      <ul className="site-path__items">

        {links.length && links.map((el, index) => 
        
          <li key={index} className="site-path__item">

            {index + 1 != links.length

            ? <Link to={el.link}>{el.text}</Link>

            : <span>{el.text}</span>}

          </li>

        )}

      </ul>
    </div>
  );
}

export default Breadcrumb;