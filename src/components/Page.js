import React, { Component } from 'react';

import { HashRouter, Route, Link, Nav, Switch } from 'react-router-dom';

const Page = ({index, page, search}) => {
  return(
    <li className={page == index ? "active" : ""}><Link to={`${search}&page[]=${index}`}>{index}</Link></li>
  );
}

export default Page;