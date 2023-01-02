import React, { useEffect } from "react";
import {Link} from 'react-router-dom';
import "./Home.scss";

import { useDispatch, useSelector } from "react-redux";
import configRoutes from '../../config/routes';
import {
  getProducts,
} from "../../redux/actions/productAction";

import SliderProduct from "../../components/SliderProduct";
import SliderHomeTop from "../../components/SliderHomeTop";
import ListProduct from "../../components/ListProduct";
import Zalo from "../../components/Zalo";
function Home() {
  const dispatch = useDispatch();
  const listProduct = useSelector((state) => state.getProducts);
  const { loading, products, error } = listProduct;
  useEffect(() => {
    dispatch(getProducts());
  },[dispatch]);
  return (
   <>
      <div className="home">
     {loading   ? "LOADING..." : loading && error ? "ERROR LOADING PRODUCTS" : 
     <SliderHomeTop  />
      }
     {loading  ? "" : loading && error ? "ERROR LOADING PRODUCTS" : 
    
      <div className="home-products">
              <div className="home-products__title" data-mark="Product">
               <Link to={configRoutes.product}>-Sản phẩm mới</Link>
              </div>
          <ListProduct news homeProducts products={products}/>
      </div> }
      <Link to={configRoutes.product} className="home-to__page-product">Đến trang sản phẩm</Link>
         <SliderProduct  hot products={products.filter(x => x.state === "HOT")}/>
         <SliderProduct delay={1000} discount products={products.filter(x => x.discount !== 0)}/>
    </div>
    <Zalo />
   </>

  );
}
export default Home;
