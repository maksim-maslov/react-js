import React, { Component } from 'react';

import { HashRouter, Route, Link, Nav, Switch } from 'react-router-dom';

const ListBreadcrumbs = ({list = []}) => {
  return list.map((el, index) => <li key={index} className="site-path__item"><Link to={el.link}>{el.text}</Link></li>);
};

export default ListBreadcrumbs;