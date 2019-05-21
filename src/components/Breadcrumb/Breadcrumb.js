import './css/BreadCrumb.css';

import React from 'react';
import { Link } from 'react-router-dom';


function Breadcrumb({ links }) {
  return (
    <div className="site-path">
      <ul className="site-path__items">

        {links.length && (
          links.map((el, index) => {
            return (
              <li className="site-path__item" key={index}>

                {index + 1 !== links.length

                ? <Link to={el.link}>{el.text}</Link>

                : <span>{el.text}</span>}

              </li>
            ); 
          })
        )}

      </ul>
    </div>
  );
}

export default Breadcrumb;