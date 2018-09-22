import React, { Component } from 'react';

const ListNewDealsMenuItem = ({list = []}) => {
  return list.map((el, index) => {
    return(
      <li key={index} className="new-deals__menu-item">
        <a href="#">{el}</a>
      </li>            
    )
  });  
}

export default ListNewDealsMenuItem;