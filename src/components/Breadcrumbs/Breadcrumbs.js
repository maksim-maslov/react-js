import React, { Component } from 'react';

import ListBreadcrumbs from './ListBreadcrumbs';

const Breadcrumbs = ({ links }) => {
  return(
    <div className="site-path">
      <ul className="site-path__items">
        {links.length > 0 && <ListBreadcrumbs list={links} />}
      </ul>
    </div>
  );
}

export default Breadcrumbs;