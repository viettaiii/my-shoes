import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  AiOutlineStar,
  AiFillThunderbolt,
  AiOutlineRollback,
} from "react-icons/ai";
import { GiCheckMark } from "react-icons/gi";
import { TfiHandPointRight } from "react-icons/tfi";
import { GiRunningShoe } from "react-icons/gi";
import { Swiper, SwiperSlide } from "swiper/react";
import {BiError} from 'react-icons/bi';
import routesConfig from "../../config/routes";
import { URL } from "../../urlApi";
import {
  FaCartPlus,
  FaTwitter,
  FaFacebook,
  FaReplyAll,
  FaPinterest,
  FaFacebookMessenger,
} from "react-icons/fa";
import { BsArrowBarRight } from "react-icons/bs";

import {
  getProductDetails,
  getProducts,
} from "../../redux/actions/productAction";
import "./productDetail.scss";
import QrCode from "../../components/Qrcode";
import Zalo from "../../components/Zalo";
import SliderProduct from "../../components/SliderProduct";
import axios from "axios";
import { getCart } from "../../redux/actions/cartAction";
import { EffectCube } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";
import { SiZalo } from "react-icons/si";
import user from '../../user';
import ModalSingup from "../../components/ModalSingup";
import useScrollToTop from "../../hooks/useScrollToTop";
import ModalModification from "../../components/ModalModification";
import ModalMofificationInfo from "../../components/ModalModification/ModalMofificationInfo";
function ProductDetail() {
      useScrollToTop();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login ,setLogin] = useState(false);
  const [qty, setQty] = useState(1);
  const productDetail = useSelector((state) => state.getProductDetails);
  const { loading, product } = productDetail;
  const listPr = useSelector((state) => state.getProducts);
  const { products } = listPr;
  const { id } = useParams();
  useEffect(() => {
    dispatch(getProductDetails(id));
    dispatch(getProducts());
  }, [id, dispatch]);
  const handleQty = (e) => {
    if (e.target === document.querySelector(".product-detail__decrease")) {
      if (qty <= 0) return;
      setQty((qty) => --qty);
    } else if (document.querySelector(".product-detail__increase")) {
      if (qty >= 10) return;
      setQty((qty) => ++qty);
    }
  };
  const handleAddProductToCart = async () => {
    if(user.TOKEN === null || user.TOKEN === undefined || user.TOKEN === "") {
      setLogin(true);
      return;
    }
    var sizeAll = document.querySelectorAll(".product-detail__size span");
    var size = null;
    sizeAll.forEach((el) => {
      if (el.classList.contains("active")) {
        return (size = parseInt(el.textContent));
      }
    });
    await axios
      .post(`${URL}/api/cart`, {
        id,
        qty,
        size,
      },
       {
        headers: {Authorization:`Bearer ${user.TOKEN}`
       }
      }
      )
      .then((res) => {
        let message = "";
        if(res.data?.message === "Create cart successfully") {
          message = "Thêm sản phẩm thành công";
        }else{
          message ="Cập nhật sản phẩm thành công";
        }
          const modification = document.querySelector('.modification');
          const modificationInfo = document.createElement('div');
          modificationInfo.classList.add('modification__info')
          modificationInfo.classList.add('success')
    modificationInfo.innerHTML =
    `
    <svg  class="modification__icon" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z"></path></svg>
   <span>${message}</span>
    ` 
    modificationInfo.style.animation = "showModification 0.5s ease-in-out forwards;"
      modification.appendChild(modificationInfo);
          setTimeout(() => {
            modificationInfo.classList.remove('success');
            modificationInfo.style.animation = "hideModification 0.5s ease-in-out forwards;"
          },2000)
          setTimeout(() => {
            modificationInfo.remove(modificationInfo);
          },3000)
      })
      .catch((err) => console.log("err", err));
      dispatch(getCart());
  };
  return (
    <>
      <Link
        to={routesConfig.home}
        style={{
          margin: "20px 240px",
          display: "flex",
          alignItems:"center",
          color: "red",
          fontWeight: "bold",
          fontSize: "2rem",
        }}
      >
        <AiOutlineRollback  style={{marginRight:"10px"}}/>
        Quay lại trang chủ
      </Link>
      <div className="product-detail">
        {loading ? (
          "Loading..."
        ) : (
          <>
            <div className="product-detail__list-images">
              {product.images ? (
                <>
                  <Swiper
                    effect={"cube"}
                    grabCursor={true}
                    cubeEffect={{
                      shadow: true,
                      slideShadows: true,
                      shadowOffset: 20,
                      shadowScale: 0.94,
                    }}
                    modules={[EffectCube]}
                  >
                    {product.images.split(" ").map((image, index) => (
                      <div key={index} className="product-detail__image">
                        <SwiperSlide
                          style={{
                            width: "100%!important",
                            hieght: "100%!important",
                          }}
                        >
                          <img
                            src={`https://kingshoes.vn/data/upload/media/${image}`}
                          />
                        </SwiperSlide>
                      </div>
                    ))}
                  </Swiper>
                </>
              ) : (
                <div className="product-detail__image">
                  <img src={product.image} alt={product.name} />
                </div>
              )}
            </div>
            <div className="product-detail__description">
              <div className="product-detail__star">
                {[...Array(product.star).keys()].map((x, index) => (
                  <span key={index}>
                    <AiOutlineStar />
                  </span>
                ))}
              </div>
              <p className="product-detail__name">{product.name}</p>
              <p className="product-detail__price">{product.price} đ</p>
              <div className="product-detail__size">
                {product.size &&
                  product.size.split(" ").map((size, index) => (
                    <span
                      className={`${index === 0 ? "active" : ""}`}
                      key={index}
                      onClick={(e) => {
                        var sizeAll = document.querySelectorAll(
                          ".product-detail__size span"
                        );
                        sizeAll.forEach((element) =>
                          element.classList.remove("active")
                        );
                        e.target.classList.add("active");
                      }}
                    >
                      {size}
                    </span>
                  ))}
              </div>
              <div className="product-detail__qty">
                <div className="product-detail__wrapper" onClick={handleQty}>
                  <button className="product-detail__decrease">-</button>
                  <span className="product-detail__amount">{qty}</span>
                  <button className="product-detail__increase">+</button>
                </div>
              </div>
              <div className="product-detail__pro-detail">
                <button
                  className="product-detail-btn product-detail__add"
                  onClick={handleAddProductToCart}
                >
                  <FaCartPlus className="product-detail__cart" />
                  Thêm giỏ hàng
                </button>
                <button
                  className="product-detail-btn product-detail__buy-now"
                  onClick={() => navigate("/cart")}
                >
                  Mua ngay
                  <BsArrowBarRight className="product-detail__next" />
                </button>
              </div>
              <div>
                <span className="product-detail__span">Hoặc đặt mua: </span>
                <a
                  href="tel:+0909300746"
                  className="product-detail__span product-detail__span--red"
                >
                  0909300746
                </a>
                <span className="product-detail__span">
                  {" "}
                  ( Tư vấn Miễn phí )
                </span>
              </div>
              <div className="product-detail__icons">
                <a
                  href="https://twitter.com/?lang=vi"
                  className="product-detail__icon product-detail__icon--twitter"
                >
                  {" "}
                  <FaTwitter />{" "}
                </a>
                <a
                  href="https://www.facebook.com/Viettaicomssss"
                  className="product-detail__icon product-detail__icon--facebook"
                >
                  {" "}
                  <FaFacebook />{" "}
                </a>
                <a
                  href="https://www.pinterest.com/"
                  className="product-detail__icon product-detail__icon--pinterest"
                >
                  {" "}
                  <FaPinterest />{" "}
                </a>
                <a
                  href="https://www.facebook.com/messages/t/5026602670779815/"
                  className="product-detail__icon product-detail__icon--message"
                >
                  {" "}
                  <FaFacebookMessenger />{" "}
                </a>
                <a
                  href="https://chat.zalo.me/"
                  className="product-detail__icon product-detail__icon--zalo"
                >
                  {" "}
                  <SiZalo />{" "}
                </a>
                <a className="product-detail__icon product-detail__icon--reply">
                  {" "}
                  <FaReplyAll />{" "}
                </a>
                <QrCode />
              </div>
            </div>
          </>
        )}
      </div>

      <div className="product__detail__description">
        <p className="product__detail__description-heading">
          <AiFillThunderbolt className="product__detail__description-heading__thunder" />{" "}
          <span className="product__detail__description-heading__span">
            KINGSHOES.VN <GiCheckMark />
          </span>
          <span>
            Ngày đổi hàng <GiCheckMark />
          </span>
          <span>
            Giao hàng miễn phí <GiCheckMark />
          </span>
          <span>
            Thanh toán khi nhận hàng <GiCheckMark />
          </span>
          <span>Bao hành hàng chính hãng trọn đời !! </span>
        </p>
        <p className="product__detail__description-heading-2">
          <TfiHandPointRight className="product__detail__description-heading-2__point" />
          <TfiHandPointRight className="product__detail__description-heading-2__point" />
          <TfiHandPointRight className="product__detail__description-heading-2__point" />
          <span> KINGSHOES.VN "You're King In Your Way".!!! </span>
          <GiRunningShoe className="product__detail__description-heading-2__shoe" />
          <GiRunningShoe className="product__detail__description-heading-2__shoe" />
          <GiRunningShoe className="product__detail__description-heading-2__shoe" />
        </p>
        <p className="product__detail__description-heading-2">
          <span> KING'S & QUEEN'S Check in Tại KINGSHOES.VN</span>
        </p>
        <p className="product__detail__description-heading-2">
          <span>
            {" "}
            192/2 Nguyễn Thái Bình, phường 12, quận Tân Bình, thành phố Hồ Chí
            Minh
          </span>
        </p>
        <p className="product__detail__description-heading-2">
          <span>
            Đến với "KINGSHOES.VN” quý khách hàng sẽ có những sản phẩm ưng ý
            nhất, chất lượng phục vụ tốt và giá thành tốt nhất, cùng những “
            Chương Trình Khuyến Mãi Đặc Biệt”.{" "}
          </span>
        </p>
        <div className="product__detail__description-video">
          <iframe src="https://www.youtube.com/embed/EXx9dP_0Bpo"></iframe>
        </div>
      </div>

      <div className="product__detail-relate">
        <SliderProduct relate products={products} />
      </div>
      <Zalo />
    {login && <ModalSingup login message="Bạn cần phải đăng nhập!"/>}  
    <ModalModification>
                    <ModalMofificationInfo/>
    </ModalModification>
    
    </>
  );
}

export default ProductDetail;
