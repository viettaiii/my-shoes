

import React from 'react';
import { memo } from 'react';
import PropTypes from 'prop-types';


import './ListProduct.scss';
import Product from '../Product'
function ListProduct({products , homeProducts , news ,mainProduct }) {
  const myClasss = [];
  if(homeProducts) {
    myClasss.push("list-products__new");
  }
  if(mainProduct) {
    myClasss.push("list-products__main")
  }
  return (
    <div className={myClasss.join(' ')}>
       {!mainProduct &&  products.filter((x) => x.state === "NEW").map((product,index) => (
              <Product discount mainProduct={mainProduct} news ={news} key={index} product={product} />
       ))}

       {mainProduct && products && products.map((product,index) => (
              <Product  mainProduct={mainProduct} news ={news} key={index} product={product} />
       ))}
    </div>
  )
}

ListProduct.propTypes = {
    products : PropTypes.array,
    homeProducts : PropTypes.bool,
    news : PropTypes.bool,
    mainProduct : PropTypes.bool,
}
export default memo(ListProduct);