import React from "react";
import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectCoverflow } from "swiper";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "./SliderProduct.scss";
import Product from "../Product";
function SliderProduct({ products, discount, hot ,  relate }) {
  return (
    <div className="slider-product">
      {discount && (
        <div className={`home-products__title ${discount? "home-products__title--discount":""}`} data-mark="Discount">
          <a href="" className="">-Sản phẩm giảm giá</a>
        </div>
      )}
      {hot && (
        <div className="home-products__title" data-mark="NỔI BẬT">
          <a href="" className="">-Sản phẩm hot</a>
        </div>
      )}
      {relate && (
        <div className={`home-products__title ${relate ? "home-products__title-relate" : ""}`} data-mark="PRODUCTS">
          <a href="" className="">-Sản phẩm liên quan</a>
        </div>
      )}
      <Swiper
    effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={5}
        coverflowEffect={{
          rotate: 30,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        modules={[EffectCoverflow, Pagination ,Autoplay]}
        autoplay={{  delay:1500 }}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          700: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1001: {
            slidesPerView: 5,
            spaceBetween: 20,
          },
        }}
      >
        {products.map((product, index) => (
          <SwiperSlide key={index}>
          {discount && <Product discount    product={product} />}  
          {hot && <Product hot product={product} />}  
          {relate && <Product relate product={product} />}  
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

SliderProduct.propTypes = {
  products : PropTypes.array,
   discount : PropTypes.bool,
   hot  : PropTypes.bool,
    relate: PropTypes.bool
}
export default SliderProduct;
