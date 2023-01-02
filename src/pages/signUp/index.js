import React, { useState } from "react";

// Immediately reload the React Native Bundle
import { AiOutlineMail } from "react-icons/ai";
import { HiOutlineLockClosed } from "react-icons/hi";
import { IoIosCloseCircle } from "react-icons/io";
import { GoLock } from "react-icons/go";
import './signUp.scss';
import { Link } from "react-router-dom";
import routesConfig from "../../config/routes";
import ModalSingup from '../../components/ModalSingup'
import {handleBlur , handleChange , handleSubmit as hdSubmit} from '../../sevices/serviceForm';
function Signup() {
  const [showSuccess , setShowSuccess ] = useState(false);
  const [showFail , setShowFail ] = useState(false);
  const handleSubmit = async (e) => {
    hdSubmit(e)
    .then(result => {
      if(undefined === result) {
        return;
      }
        if(result === true) {
          setShowSuccess(true);
          setShowFail(false);
        }else{
          setShowSuccess(false);
          setShowFail(true);
        }
    })
    .catch(err => {
      console.log(err);
    })
  }
  const handleRemoveShowFail = () => {
    setShowFail(false);
  }
  return (
    <div className="sign-up">
      <form  method="post"  className="form-sign-up" id="form-sign-up">
      <h2 className="form-sign-up__heading">Sign up</h2>
        <div className="mb-3  form-wrapper">
          <label htmlFor="email" className="form-label">
         Nhập email của bạn
          </label>
        
         <div className="form-group">
    <AiOutlineMail className="form-sign-up__icon"/>
         <input
          onBlur={handleBlur}
          onChange={handleChange}
          
            type="email"
            name="email"
            className="form-control"
            id="email"
            placeholder="example@gmail.com"
            aria-describedby="emailHelp"
          />
         </div>
         <small className="form-message"></small>
        </div>
        <div className="mb-3  form-wrapper">
          <label htmlFor="password" className="form-label">
          Nhập mật khẩu của bạn
          </label>
          
          <div className="form-group">
    <HiOutlineLockClosed className="form-sign-up__icon"/>
          <input
           onBlur={handleBlur}
           onChange={handleChange}
            type="password"
            name="password"
            className="form-control"
            placeholder="123123"
            id="password"
          />
        </div>
        <small className="form-message invalid"></small>
        </div>
        <div className="mb-3  form-wrapper">
          <label htmlFor="confirmation-password" className="form-label">
          Xác nhận mật khẩu của bạn
          </label>

          <div className="form-group">
    <GoLock className="form-sign-up__icon"/>
          <input
           onBlur={handleBlur}
           onChange={handleChange}
            type="password"
            name="confirmation-password"
            className="form-control"
            placeholder="123123"
            id="confirmation-password"
          />
        </div>
        <small className="form-message invalid"></small>
        </div>
        <button type="submit" onClick={handleSubmit} className="btn btn-primary btn-sign-up">
         Đăng ký
        </button>

        <span className="next-to-login">
        Nếu bạn đã có tài khoản ? 
          <Link to={routesConfig.login}> Sign in</Link>

        </span>
      </form>
     {showSuccess &&  <ModalSingup showSuccess message={"Bạn đã tạo tài khoản thành công"}  />}
     {showFail &&  <ModalSingup iconClose={<IoIosCloseCircle className="sub-signup__top__icon" />} showFail handleRemoveShowFail={handleRemoveShowFail} message={"Email đã có người sử dụng!"}  />}
    </div>
  );
}

export default Signup;
