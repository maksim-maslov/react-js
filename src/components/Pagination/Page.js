import React, { Component } from 'react';

import { HashRouter, Route, Link, Nav, Switch } from 'react-router-dom';

const Page = ({index, page, nextPage}) => {
  return(
    <li className={page == index ? 'active' : ''} ><a onClick={() => nextPage(index)} >{index}</a></li>
  );
}

export default Page;