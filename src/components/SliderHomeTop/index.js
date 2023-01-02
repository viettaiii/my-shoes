

import React from 'react';


import slider1 from '../../assets/slider/1.jpeg';
import slider2 from '../../assets/slider/2.jpeg';
import slider3 from '../../assets/slider/3.png';
import { memo } from 'react';
import {FcNext , FcPrevious} from 'react-icons/fc';
import {FaRegMoneyBillAlt} from 'react-icons/fa';
import {TbTruckDelivery } from 'react-icons/tb';
import {RiCustomerService2Line} from 'react-icons/ri';
const sliders = [slider1,slider2,slider3];
function SliderHomeTop() {
  let show = 0;
  let showing = 0 ;
  const handleNext = () => {
    const imgs = document.querySelectorAll('.home__slider-img');
    imgs.forEach((img,index) => {
      if(img.classList.contains('show')) {
        if(index <= 0) {
          showing = index;
           show = ++index;
        }else if(index >= imgs.length - 1) {
          showing = index;
          show = 0;
        }else{
          showing = index;
          show = ++index;
        }
      }
      return;
    })
    showSlider(imgs)
  }
 
  const showSlider = (imgs) => {
    const cirles = document.querySelectorAll('.home__slider-cirle');
    cirles.forEach((cirle,index) => {
        cirle.classList.remove('show');
  } )
    imgs[showing].classList.remove('show')
    imgs[show].classList.add('show')
    cirles[show].classList.add('show');
  }


  const handlePrev = () => {
    const imgs = document.querySelectorAll('.home__slider-img');
    imgs.forEach((img,index) => {
      if(img.classList.contains('show')) {
        if(index <= 0) {
          showing = index;
           show = imgs.length - 1;
        }else if(index >= imgs.length - 1) {
          showing = index;
          show = --index;
        }else{
          showing = index;
          show = --index;
        }
      }
      return;
    })
    showSlider(imgs)
  }
  const handleCirle = (e) => {
    const imgs = document.querySelectorAll('.home__slider-img');
    const cirles = document.querySelectorAll('.home__slider-cirle');
    cirles.forEach((cirle,index) => {
        if(e.target === cirle) {
            show = index;
        } 
        cirle.classList.remove('show');
    } )
    imgs.forEach(img => {
      img.classList.remove('show');
    })
    imgs[show].classList.add('show')
    cirles[show].classList.add('show');
  }
  return (
    <> <div className='home__wrapper-slider'>
    <div className='home__slider'>
         <div className='home__slider-img show' style={{backgroundImage:`url(${slider1})`}}></div>
         <div className='home__slider-img' style={{backgroundImage:`url(${slider2})`}}></div>
         <div className='home__slider-img' style={{backgroundImage:`url(${slider3})`}}></div>
     </div>
     <button className='home_btn home_btn-next'  onClick={handleNext}> <FcNext/></button>
         <button className='home_btn home_btn-prev' onClick={handlePrev}><FcPrevious/></button>
    <div className='home__slider-cirles'>
         {sliders.map((x,index) => (
           <span className={`home__slider-cirle ${index === 0 ? 'show':''}`} key={index} onClick={handleCirle}></span>
         ))}
    </div>
    </div>

    <div className='home__features'>
            <div className='home__feature'>
             <FaRegMoneyBillAlt  className='home__feature-icon'/>
             <h3 className='home__feature-title'>CAM KẾT CHÍNH HÃNG</h3>
             <p className='home__feature-persent'>100 % Authentic</p>
             <p className='home__feature-description'>Cam kết sản phẩm chính hãng từ Châu Âu, Châu Mỹ...</p>
            </div>
            <div className='home__feature'>
             <TbTruckDelivery className='home__feature-icon' />
             <h3 className='home__feature-title'>GIAO HÀNG HỎA TỐC</h3>
             <p className='home__feature-persent'>Express delivery</p>
             <p className='home__feature-description'>SHIP hỏa tốc 1h nhận hàng trong nội thành HCM</p>
            </div>
            <div className='home__feature'>
             <RiCustomerService2Line  className='home__feature-icon'/>
             <h3 className='home__feature-title'>HỖ TRỢ 24/24</h3>
             <p className='home__feature-persent'>Supporting 24/24</p>
             <p className='home__feature-description'>Gọi ngay</p>
            </div>
    </div></>
  )
}

export default memo(SliderHomeTop)