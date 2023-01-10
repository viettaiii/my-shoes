import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch , useSelector } from "react-redux";

import "./cart.scss";
import { CiSquareRemove } from "react-icons/ci";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";
import Zalo from "../../components/Zalo";
import routesConfig from "../../config/routes";
import { URL } from "../../urlApi";
import { getCart } from "../../redux/actions/cartAction";
import user from '../../user';
function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getCartItems = useSelector(state => state.cart);
  const {cartItems : cart } = getCartItems;
  useEffect(() => {
    dispatch(getCart());
},[dispatch])
  const [total, setTotal] = useState(0);
  const handlePrice = (price = "", qty) => {
    var arr = price.split(",");
    if (arr.length <= 1) {
      arr = price.split(".");
    }
    var newPriceInt = "";
    arr.forEach((item) => {
      newPriceInt += item;
    });
    var priceInt = parseInt(newPriceInt);
    return priceInt * qty;
  };

  useEffect(() => {
    const cartTotal = cart.reduce(
      (sum, item) => sum + handlePrice(item.price, item.qty),
      0
    );
    if (cartTotal !== total) {
      setTotal(cartTotal);
    }
  }, [cart ,total]);

  const handleDeleteProductFromCart =  async (id) => {
     await axios.delete(`${URL}/api/cart/${id}`, {
      headers: {Authorization:`Bearer ${user.TOKEN}`
     }
    })
     .then(res => 
      navigate(res.data.redirect)
      )
     .catch(err => console.log("ERROR", err));
     dispatch(getCart());
  }
  
  return (
    <>
      <div className="cart">
       {cart.length <= 0 ? "":  <h3 className="cart__heading">Giỏ hàng</h3>}
        {cart.length <= 0
          ? ""
          : cart.map((item, index) => (
              <div key={index} className="cart__shopping">
                <img
                  className="cart__shopping__img"
                  src={item.image}
                  alt={item.name}
                />
                <div className="cart__shopping__description">
                  <h4 className="cart__shopping__name">{item.name}</h4>
                  <p className="cart__shopping__size">
                    Size Giày : {item.size}
                  </p>
                  <p className="cart__shopping__ma-sp">
                    Mã SP : <span> {item.id}</span>
                  </p>
                  <div className="cart__shopping__qty">
                    <button
                      className="cart__shopping__decrease none"
                      onClick={(e) => {

                      }}
                    >
                      -
                    </button>
                    <span className="cart__shopping__amount">
                     SL: {item.newQty || item.qty} cái
                    </span>
                    <button
                      className="cart__shopping__increase none"
                      onClick={(e) => {

                      }}
                    >
                      +
                    </button>
                    <span className="cart__shopping__price">
                      X {item.price} đ
                    </span>
                  </div>
                  <div>
                    <h3 className="cart__shopping__total">
                      Thành tiền :{" "}
                      {handlePrice(
                        item.price,
                        (item.newQty = item.qty || item.qty)
                      ).toLocaleString("en-AU")} đ
                    </h3>
                  </div>
                </div>
                <button className="cart__shopping__delete" onClick={() => handleDeleteProductFromCart(item.id)}>
                  <CiSquareRemove className="cart__shopping__icon-delete" />
                </button>
              </div>
            ))}

        {cart.length <=0 ? (
         <div className="cart__empty">
         <h3 >Giỏ hàng</h3>
          <h4>
          Bạn chưa có sản phẩm nào?
          <Link className="cart__to-product" to={routesConfig.product}>   Mua ngay.</Link>
          </h4>
         </div>
        ) :(
          <div className="cart__total">
          <h3>
            Tổng tiền : <span>{total.toLocaleString("en-AU")} đ</span>
          </h3>
          <button onClick={() => navigate(routesConfig.product)}>
          <AiOutlineDoubleLeft /> Mua tiếp
          </button>
          <button  onClick={() => navigate(routesConfig.checkOut)}>
            Đặt hàng <AiOutlineDoubleRight />
          </button>
        </div>
        )}
      </div>
      <Zalo />
    </>
  );
}

export default Cart;
