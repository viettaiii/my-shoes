import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsCartPlus } from "react-icons/bs";
import { AiOutlineLogin, AiOutlineMenu } from "react-icons/ai";
import { BiCalendarCheck} from "react-icons/bi";
import {BiExpandAlt} from 'react-icons/bi';
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { getCart } from "../../../redux/actions/cartAction";

import "./Header.scss";
import routesConfig from "../../../config/routes";
import logo from "../../../assets/logo.png";
import defaultUser from "../../../assets/default_user.jpeg";
import MenuNav from "../../MenuNav";
import { listMenu } from "../../../assets/listMenu";
import Search from "../../Search";

import user from '../../../user';
function Header({ onClickShowSidebar }) {
  const dispatch = useDispatch();
  const getCartItems = useSelector((state) => state.cart);
  const { cartItems } = getCartItems;
  const handleLogOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
        navigate(routesConfig.login);
      window.location.reload();
  }
  const navigate = useNavigate();
  const handleLink = (e, path) => {
    if (
      e.target.classList.contains("header__item") ||
      e.target.classList.contains("header__link")
    ) {
      navigate(path);
    }
  };
  const handleShowMenuUser = () => {
    const headerUserMenu = document.querySelector(".header__user-menu");
    headerUserMenu.classList.toggle("show");
    setTimeout(() => {
      headerUserMenu.classList.remove("show");
    }, 5000);
  };
  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  const handleFixedHeader = () => {
    const header = document.querySelector(".header");
    const headerItems = document.querySelectorAll(".header__item");
    if (window.scrollY > 140) {
      let divProps = Object.assign(header.style, {
        position: "fixed",
        zIndex: 99,
        top: 0,
        left: 0,
        right: 0,
        background: "rgb(128 128 128 / 16%)",
      });
      headerItems.forEach((item) => {
        Object.assign(item.style, {
          color:" #0d1ee4",
    fontWeight: "800",
    fontSize: "1.6rem",
    textShadow: "1px 1px rgb(0 0 0 / 40%)",
        })
      });
      delete divProps.layout;
    } else {
      if (window.screenY < 140) {
        let divProps = Object.assign(header.style, {
          position: "relative",
          top: "initial",
          left: "initial",
          right: "initial",
          background: "initial",
        });
        headerItems.forEach((item) => {
          Object.assign(item.style, {
            color:"#b33b3b",
            fontSize: "1.6rem",
          })
        });
        delete divProps.layout;
      }
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleFixedHeader);
    return () => {
      window.removeEventListener("scroll", handleFixedHeader);
    };
  }, []);
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
  return (
    <div className="header">
      <Link className="header__logo" to={routesConfig.home}>
        <img className="header__logo__img" src={logo} alt="KINGSHOES.VN" />
      </Link>
      <MenuNav listMenu={listMenu} handleLink={handleLink} />
      <div className="header__search-cart">
        <Search />
     {user.ROLE !== 'admin;' ? (   <Link to={routesConfig.cart} className="header__cart">
          <BsCartPlus className="header__cart-icon" />
          <span className="header__cart-amount">{cartItems.length}</span>
          <Link to={routesConfig.cart} className="header__cart-list">
            { cartItems.length <= 0
              ? <span className="header__cart__no-item">Không có món hàng nào</span>
              : cartItems.map((item,index) => (
                  <div key={index} className="header__cart-item">
                    <img src={item.image} alt={item.name} />
                    <div className="header__cart-descrip">
                      <p className="header__cart-descrip__name">{item.name}</p>
                      <div className="header__cart-descrip__size">
                        Size : {item.size}
                      </div>
                      <p className="header__cart-descrip__amount">
                        <span>Số lượng</span> : {item.qty}
                      </p>
                      <p className="header__cart-descrip__amount">
                        <span>Thành tiền</span> :{" "}
                        {handlePrice(
                          item.price,
                          (item.newQty = item.qty || item.qty)
                        ).toLocaleString("en-AU")}{" "}
                        đ
                      </p>
                    </div>
                  </div>
                ))}
          </Link>
        </Link>) : (

        <Link to={routesConfig.admin} className='header__admin'> 
                <BiCalendarCheck />
        </Link>

        )}
        <div className="header__menu-toggle" onClick={onClickShowSidebar}>
          <AiOutlineMenu />
        </div>
        <div className="header__user" onClick={handleShowMenuUser}>

          <img className="header__user-img" src={defaultUser} alt="USER" />
           

          <div className="header__user-menu">
         
        {user.ROLE === 'admin;' ? <>
        <Link className="header__user-link" to={routesConfig.admin}>
             <AiOutlineLogin /> <span>Quản lí</span>
            </Link>
            <Link className="header__user-link"  onClick={handleLogOut}>
             <BiExpandAlt /> <span>Log out</span>
            </Link>
        </> : user.TOKEN !== null && user.TOKEN !== undefined && user.TOKEN !== "" && user.ROLE ==='client;'? 
           (
           <>
           <Link className="header__user-link" to={routesConfig.profile} >
             <AiOutlineLogin /> <span>Profile</span>
            </Link>
            <Link className="header__user-link" to={routesConfig.cart}>
             <BiExpandAlt /> <span>Túi hàng</span>
            </Link>
            <Link className="header__user-link" onClick={handleLogOut}>
             <BiExpandAlt /> <span>Log out</span>
            </Link>
           </>
          ): (
<>
            <Link className="header__user-link" to={routesConfig.login}>
             <AiOutlineLogin /> <span>Đăng nhập</span>
            </Link>
            <Link className="header__user-link" to={routesConfig.signup}>
             <BiExpandAlt /> <span>Đăng ký</span>
            </Link>
            </>
          )}
          </div>
        </div>
      </div>
    </div>
  );
}

Header.propTypes = {
  onClickShowSidebar: PropTypes.func,
};

export default Header;
