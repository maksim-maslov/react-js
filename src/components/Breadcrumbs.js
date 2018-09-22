import React, { Component } from 'react';

import ListBreadcrumbs from './ListBreadcrumbs';

const Breadcrumbs = props => {
  return(
    <div className="site-path">
      <ul className="site-path__items">
        <ListBreadcrumbs list={props.links} />
      </ul>
    </div>
  );
}

export default Breadcrumbs;