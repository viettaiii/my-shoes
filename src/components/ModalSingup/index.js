

import React from 'react'

import routesConfig from '../../config/routes';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import './ModalSingup.scss';
function ModalSingup({message , showSuccess , showFail ,login,showErrorLogin , handleRemoveShowFail,handleRemoveShowError ,handleToPageHome , reset , iconClose}) {
  return (
    <div className='modal-signup'>
            <div className='sub-signup'>
                    <div className='sub-signup__top'>
                        <p>{message}</p>
                  {!iconClose&&!showErrorLogin && !login && <p> <AiOutlineCheckCircle className='sub-signup__top__icon'/></p>}     
                  {iconClose && iconClose}     
                    </div>
                    <div className='sub-signup__bottom'>
                       {showSuccess  && <Link  to={routesConfig.login} className='sub-signup__bottom__continue'>Login</Link>} 
                       {login  && <Link  to={routesConfig.login} className='sub-signup__bottom__continue'>Login</Link>} 
                       {showFail && <button onClick={handleRemoveShowFail} className='sub-signup__bottom__continue'>Continue</button>} 
                       {showErrorLogin && <button onClick={handleRemoveShowError} className='sub-signup__bottom__continue'>Continue</button>} 
                       {reset && <button onClick={handleToPageHome} className='sub-signup__bottom__continue'>Continue</button>} 
                    </div>
            </div>
    </div>
  )
}

export default ModalSingup;