import React, { Component } from 'react';

import { HashRouter, Route, Link, Nav, Switch } from 'react-router-dom';

const Page = ({ index, page, changePage }) => <li className={page == index ? 'active' : ''} ><a onClick={() => changePage(index)} >{index}</a></li>;

export default Page;