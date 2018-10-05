import React, { Component } from 'react';

import { HashRouter, Route, Link, Nav, NavLink, Switch } from 'react-router-dom';

const Page = ({index, page, categoryId}) => {
  return(
    <li className={page == index ? "active" : ""}><NavLink to={{pathname: '/catalogue', search: `?categoryId=${categoryId}&page[]=${index}`}}>{index}</NavLink></li>
  );
}

export default Page;