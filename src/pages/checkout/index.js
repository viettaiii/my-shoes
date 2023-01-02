import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {GrFormPreviousLink} from 'react-icons/gr'
import { useSelector , useDispatch } from "react-redux";

import { getCart } from "../../redux/actions/cartAction";
import  routesConfig from '../../config/routes';
import "./checkout.scss";
function Checkout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getCartItems = useSelector(state => state.cart);
  const {cartItems} = getCartItems;
  const [total ,setTotal] = useState(0);
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
    console.log(priceInt * qty)
    return priceInt * qty;
  };
  
  useEffect(() => {
      dispatch(getCart());
  },[dispatch])
  useEffect(() => {
   var cartTotal = cartItems.reduce(
      (sum, item) => sum + handlePrice(item.price, item.qty),
      0
    );
    if(cartTotal !== total) {
      setTotal(cartTotal);
    }
  }, []);
  return (
    <>
    <div className="check-out">
      <div className="check-out__imformation">
        <img 
          onClick={() => navigate(routesConfig.home)}
          className="check-out__logo"
          src="https://kingshoes.vn/data/upload/media/cu%CC%9B%CC%89a-ha%CC%80ng-gia%CC%80y-sneaker-chi%CC%81nh-ha%CC%80ng-uy-ti%CC%81n-nha%CC%82%CC%81t-de%CC%82%CC%81n-king-shoes-authenti-hcm-6.png"
          alt=""
        />
        <h3 className="check-out__title">Thông tin giao hàng</h3>
        <form id="form-check-out">
          <div className="form-group-name-number">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              placeholder="Họ và tên"
            />

          </div>


          <div className="form-group">
          <input
              type="text"
              className="form-control"
              id="phone-number"
              name="phone-number"
              placeholder="Số điện thoại"
            />
          </div>
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="address"
              name="address"
              placeholder="Địa chỉ"
            />
          </div>

          <div className="form-group">
          <input
              type="text"
              className="form-control"
              id="province"
              name="province"
              placeholder="Tỉnh/Thành"
            />
          </div>
           <div className="form-group">
          <input
              type="text"
              className="form-control"
              id="district"
              name="district"
              placeholder="Huyện/Tỉnh"
            />
          </div>

          <div className="form-group">
          <input
              type="text"
              className="form-control"
              id="ward"
              name="ward"
              placeholder="Phường/Xã"
            />
          </div>
          <div className="form-group">
          <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="example@domain.com"
            />
          </div>

          <div className="form-group">
          <input
              type="text"
              className="form-control"
              id="content"
              name="content"
              placeholder="Nội dung"
            />
          </div>

         <div className="form-group">
         <Link className="check-out__back-cart" to={routesConfig.cart} >
         <GrFormPreviousLink className="check-out__back-prev"/>
         Giỏ hàng</Link>
         <button className="check-out__submit" type="submit">Thanh toán</button>
         </div>
        </form>
        <div className="check-out__footer">
      <ul className="check-out__footer__list">
        <li>
          Chăm sóc khách hàng
        </li>
        <li>
        Thanh toán
        </li>
        <li>
        Hướng dẫn mua hàng
        </li>
        <li>
        Chế độ bảo hành
        </li>
        <li>
        Chính sách đổi hàng
        </li>
        <li>
        Bảo mật thông tin
        </li>
        <li>
        Chính sách giao nhận
        </li>
      </ul>
    </div>
      </div>
      <div className="check-out__details">
      {cartItems.map((item,index )=> (
        
        <div key={index} className="check-out__item">
            <div className="check-out__item__img">
            <img src={item.image} alt={item.name}/>
            <span className="check-out__item__amount">{item.qty}</span>
            </div>
            <div className="check-out__item__info">
                  <h4 className="check-out__item__info-title">{item.name}</h4>
                  <p  className="check-out__item__info-size">Size giày : {item.size} </p>
            </div>
            <div className="check-out__item__price">
                  <h5>{handlePrice(item.price,item.qty).toLocaleString('en-AU')} đ</h5>
            </div>
        </div>
      ))}
      <div className="check-out__total">
          <p><span>Tạm tính</span> <span>{total.toLocaleString('en-AU')} đ</span></p>
          <p><span>Phí giao hàng</span><span>Chưa bao gồm</span></p>
      </div>
      <div className="check-out__total">
          <p className="check-out__total-price"><span>Tông cộng</span> <span>{total.toLocaleString('en-AU')} đ</span></p>
          
      </div>
      </div>
    </div>
  
    </>
  );
}

export default Checkout;
