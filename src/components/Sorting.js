import React, { Component } from 'react';

const Sorting = () => {
    return(
        <div className="product-catalogue__sort-by">
            <p className="sort-by">Сортировать</p>
            <select name="" id="sorting">
                <option value="">по популярности</option>
                <option value="">по размеру</option>
                <option value="">по производителю</option>
            </select>
        </div>
    );
}

export default Sorting;