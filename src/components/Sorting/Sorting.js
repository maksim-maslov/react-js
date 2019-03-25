import React, { Component } from 'react';

const Sorting = ({ updateFilters }) => {
  return(
    <div className="product-catalogue__sort-by" onChange={updateFilters}>
      <p className="sort-by">Сортировать</p>
      <select name="" id="sorting">
        <option value="price">по цене</option>
        <option value="popularity">по популярности</option>
      </select>
    </div>
  );
}

export default Sorting;