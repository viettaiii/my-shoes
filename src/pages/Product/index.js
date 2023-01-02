import React, { useEffect, useState } from "react";
import ProductSort from "../../components/ProductSort";
import "./Product.scss";
import Zalo from "../../components/Zalo";
import ProductNavigation from "../../components/ProductNavigation";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/actions/productAction";
import ProductPage from "../../components/ProductPage";
import ProductRight from "../../components/ProductRight";
import useScrollToTop from "../../hooks/useScrollToTop";
function Product() {
  useScrollToTop();
  const dispatch = useDispatch();
  const [price ,setPrice] = useState("");
  const [orderBy ,setOrderBy] = useState("");
  const listPr = useSelector((state) => state.getProducts);
  const { products } = listPr;
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  const handleSortProduct = () => {
      var selection = document.querySelectorAll(".product-sort__selection");
      selection.forEach((select,index) => {
        if(index === 0 && selection[0].textContent !== "Tất cả"){
          setPrice(selection[0].textContent);
        }else if(index === 1 && selection[1].textContent !=="Giá thấp đến cao"){
          setOrderBy(selection[1].textContent)
        }
      })
  }
  return (
    <>  
      <>
        <ProductSort />
         <ProductPage />
        <div className="main-product">
          <div className="main-product__left">
            <ProductNavigation discount  />
          </div>
            <ProductRight products={products}/>
        </div>
      </>
      <Zalo />
    </>
  );
}

export default Product;
