import React from "react";
import PropTypes from 'prop-types';
import { AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";
function Product({ product, hot, discount, news, relate, mainProduct }) {
  

  return (
    <Link to={`/product/${product.id}`} className="product">
      <div className="product__image">
        <img src={product.image} alt={product.name} />
      </div>
      <h4 className="product__name">{product.name}</h4>
      <div className="product__stars">
        {[...Array(product.star).keys()].map((x, index) => (
          <span key={index}>
            <AiFillStar />
          </span>
        ))}
      </div>

      { discount && product.state === "HOT" && product.discount !== 0 && (
        <p className="product__price">
          {Number.parseFloat(
            parseFloat(product.price) -
              (parseFloat(product.price) * product.discount) / 100
          ).toFixed(3) + ".000 đ"}
        </p>
      )}
      <p
        className={`product__price ${
          discount && product.discount ? "product__price__old" : ""
        }`}
      >
        {product.price} đ
      </p>
        
      {news && (
        <span
          className={`product__new ${mainProduct ? "product__new-main" : ""} `}
        >
          NEW
        </span>
      )}
     

      {!discount &&  relate && product.discount !== 0 ? (
        <span
          className={`product__new ${mainProduct ? "product__new-main" : ""}`}
        >
          HOT 
        </span>
      ) : !hot &&  (
        !discount && 
        <span
          className={`product__new ${mainProduct ? "product__new-main" : ""}`}
        >
         NEW
        </span>
      )}
      { !discount && hot && (
        <span
          className={`product__new ${mainProduct ? "product__new-main" : ""} ${hot ? "product__hot ":""}`}
        > 
          {  hot && "HOT" } 
        </span>
      )}
      { !news &&  !hot && discount && (
        <span
          className={`product__new ${mainProduct ? "product__new-main" : ""} ${hot ? "product__hot ":""}`}
        > 
          {  discount && "SALE" } 
        </span>
      )}

    </Link>
  );
}

Product.propTypes = {
  product : PropTypes.object,
  hot : PropTypes.bool,
  discount : PropTypes.bool,
  news : PropTypes.bool,
  relate : PropTypes.bool,
  mainProduct : PropTypes.bool
}
export default Product;
