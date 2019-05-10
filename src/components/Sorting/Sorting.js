import './css/Sorting.css';

import React, { Component } from 'react';

const Sorting = ({ updateFilters }) => {
  return(
    <div className="product-catalogue__sort-by" onChange={ev => updateFilters('sortBy', ev.target.value)}>
      <p className="sort-by"></p>
      <select name="" id="sorting">
        <option value="price">По возрастанию цены</option>
        <option value="popularity">По популярности</option>
      </select>
    </div>
  );
}

export default Sorting;