import './css/Page.css';

import React, { Component } from 'react';

import { HashRouter, Route, Link, Nav, Switch } from 'react-router-dom';

const Page = ({ index, page, changePage }) => <li><a className={page == index ? 'active' : ''} onClick={() => changePage(index)} >{index}</a></li>;

export default Page;