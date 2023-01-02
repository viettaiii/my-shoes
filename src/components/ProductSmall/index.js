

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AiFillStar } from 'react-icons/ai'
import { Swiper, SwiperSlide } from "swiper/react";
import routesConfig from '../../config/routes';
import { FreeMode, Scrollbar, Mousewheel } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";
function ProductSmall({products }) {
    const navigate = useNavigate();
  return (
    <>
    {
       ( <div className="main-product__right__content main-product__right__content--product">
    <Swiper
        direction={"vertical"}
        slidesPerView={"auto"}
        freeMode={true}
        grabCursor={true}
        scrollbar={{ draggable: true }}
        mousewheel={true}
        modules={[FreeMode, Scrollbar, Mousewheel]}
        className="mySwiper"
    >
    {products.map((product, index) => (
      <SwiperSlide key={index}>
      <div
        onClick={() => navigate(routesConfig.product+"/"+product.id)}
        key={index}
        className="main-product__right-block main-product__right-block--product "
      >
        <img src={product.image} alt={product.name} />
        <div className="main-product__right__description">
          <p>{product.name}</p>
          <p>
            {" "}
            {[...Array(product.star).keys()].map((x, index) => (
              <span key={index}>
                {" "}
                <AiFillStar className="main-product__right__description__star" />
              </span>
            ))}
          </p>
          <p>{product.price+"".toLocaleString('en-AU')} đ</p>
        </div>
      </div>
      </SwiperSlide>
    ))}


    </Swiper>

  </div>)
    }
   
  
  
  </>
  )
}

export default ProductSmall