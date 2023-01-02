import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineMail } from "react-icons/ai";
import { HiOutlineLockClosed } from "react-icons/hi";
import { Link } from "react-router-dom";
import ModalSingup from "../../components/ModalSingup";
import routesConfig from "../../config/routes";
import {handleBlur , handleChange , handleSubmit as hdSubmit } from '../../sevices/serviceForm';
function Login() {
    const [showErrorLogin , setShowErrorLogin] = useState(false);
    const [reset , setReset]  = useState(false); 
    const navigate = useNavigate();
  const handleSubmit = (e) => {
    hdSubmit(e)
    .then(result => {
      if(result === undefined || result === false) {
        setShowErrorLogin(true);
      }else if(result === true) {
        navigate('/');
        window.location.reload();
      }
    })
  }
 
  const handleRemoveShowError = () => {
    setShowErrorLogin(false);
    setReset(false);
  }
  return (
    <div className="login">
      <form method="post" className="form-sign-up form-sign-in" id="form-sign-up form-sign-in">
      <h2 className="form-sign-up__heading">Sign in</h2>
        <div className="mb-3  form-wrapper">
          <label htmlFor="email" className="form-label">
         Nhập email của bạn
          </label>
        
         <div className="form-group">
    <AiOutlineMail className="form-sign-up__icon"/>
         <input
            type="email"
            name="email"
            onBlur={handleBlur}
            onChange={handleChange}
            className="form-control"
            id="email"
            placeholder="example@gmail.com"
            aria-describedby="emailHelp"
          />
         </div>
         <small className="form-message"></small>
        </div>
        <div className="mb-3 form-wrapper">
          <label htmlFor="password" className="form-label">
          Nhập mật khẩu của bạn
          </label>
          
          <div className="form-group">
    <HiOutlineLockClosed className="form-sign-up__icon"/>
          <input
            type="password"
            name="password"
            onBlur={handleBlur}
            onChange={handleChange}
            className="form-control"
            placeholder="123123"
            id="password"
          />
        </div>
        <small className="form-message"></small>
        </div>
        <button type="submit" onClick={handleSubmit} className="btn btn-primary btn-sign-up btn-sign-in">
         Đăng nhập
        </button>

        <span className="next-to-login">
        Nếu bạn  chưa tài khoản  ? 
          <Link to={routesConfig.signup}>  Sign up</Link>

        </span>
      </form>

    {showErrorLogin &&  <ModalSingup handleRemoveShowError={handleRemoveShowError}  showErrorLogin message={"Email hoặc mật khẩu của bạn không đúng?"} />} 
    {reset &&  <ModalSingup handleToPageHome={() => navigate(routesConfig.home)}  reset message={"Quý khách đã đăng nhập thành công,vui lòng f5 để có thể sử dụng được tính năng khi đăng nhập,Xin lỗi vì sự bất tiện này"} />} 
    </div>
  );
}

export default Login;
