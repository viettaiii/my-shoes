
import React, { useState } from 'react';
import { useRef } from 'react';
import PropTypes from 'prop-types';

import './Footer.scss';
import {HiOutlineLocationMarker, HiOutlineMail} from 'react-icons/hi';
import ModalCodeEmail from '../../ModalCodeEmail';
import { AiOutlineMail, AiOutlinePhone } from 'react-icons/ai';
import { FiMousePointer} from 'react-icons/fi';

function Footer() {
  const [showModalEmail ,setShowModelEmail] = useState(false);
  const emailRef = useRef();
  const handleSubmit = (e) => {
    var message = document.querySelector('.footer__form-message');
    e.preventDefault();
    const re =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
   let checkEmail = re.test(emailRef.current.value.trim());
    if(checkEmail){
      emailRef.current.value = "";
      setShowModelEmail(true);
      message.classList.remove('invalid');
      message.innerText= "";
    }else{
      if(emailRef.current.value.trim()) {
        message.classList.add('invalid');
        message.innerText= "Vui lòng nhập đúng định dạng email  ";
        //
      }else{
        message.classList.add('invalid');
        message.innerText= "Vui lòng nhập email!";
      }
    }
  }
  const onHideModal = () => {
    setShowModelEmail(false);
  }
  const handeChange = ( ) => {
    var message = document.querySelector('.footer__form-message');
    message.classList.remove('invalid');
    message.innerText= "";
  }
  return (
    <div className='footer'>
        <div className='footer__email'>
            <h3 className='footer__email-header'> 
            <HiOutlineMail className='footer__email-icon' />
            Đăng ký nhận code</h3>
            <form method='POST' action='' className='footer__search'>
               <input ref={emailRef}  onChange={handeChange} type="email" placeholder='Địa chỉ email của bạn'  className='register-email' id="register-email" name="register-email"/>
               <button onClick={handleSubmit} type='submit' className="footer__btn-register">Đăng ký</button>
               <span className='footer__form-message'></span>
            </form>
            <div className='footer__voucher'>
                <p>...Nhận ngay <span>VOUCHER 100K</span> từ chúng tôi</p>
            </div>
        </div>  
        <div className='footer__bottom'>
            <h2>Thông tin cá nhân</h2>
          <footer>
          <div className='footer__left'>
            <h4 className='footer__center__my-name'>Viết Tài</h4>
                  <img className='footer__left__avatar' src='https://inkythuatso.com/uploads/thumbnails/800/2022/03/avatar-nam-buon-an-tuong-600x600-29-10-43-29.jpg' alt='avatar'/>
            </div>
            <div className='footer__center'>
                <h3 className='footer__center__purpose'>
                      Mục địch chính của dự án
                </h3>
                <p>-- Nhằm học tập</p>
                <p>-- Luyện tập kiến thức đã học</p>
                <p>-- Luyện kĩ năng</p>
            </div>
            <div className='footer__right'>
                  <div className='footer__right-icons'>
                   <p> <HiOutlineLocationMarker/></p>
                  <p>  <AiOutlinePhone/></p>
                  <p>  <AiOutlineMail/></p>
                  <p><FiMousePointer/></p>
                  </div>
                  <div className='footer__right-info'>
      <p>362/7 Hoàng Diệu,ĐN</p>
      <p>0329638...</p>
      <p>viettaixca123@gmail.com</p>
      <a href='https://github.com/Viettaiedu'>Git: https://github.com/Viettaiedu</a>
                  </div>
            </div>
          </footer>

          </div>
         { showModalEmail && <ModalCodeEmail onHideModal={onHideModal} />}
    </div>
  )
}

Footer.propTypes = {
  
}
export default Footer