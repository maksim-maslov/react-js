import React, { Component } from 'react';

import ListItemCard from './ListItemCard';

const ProductCatalogueItemList = ({products}) => {
    return(
        <section  className="product-catalogue__item-list">
            <ListItemCard list={products} />
        </section>            
    )
}

export default ProductCatalogueItemList;



