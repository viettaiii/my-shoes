
import React from 'react'
import { Link } from 'react-router-dom';
import {GrUserSettings} from 'react-icons/gr';
import routesConfig from '../../config/routes';
import user from '../../user';
import './admin.scss';
const manager = [
    {to: '/admin/products' , display:"Sản phẩm"},
    {to: '/admin/user' , display:"Khách hàng"},
]
function Manager() {
    return (
        <>
          {user.ROLE === 'admin;' ?  <div className='manager'>
              <div className='manager__sidebar'>
                <h3 className='manager__heading'>
                    <GrUserSettings className='manager__heading-icon'/>
                    Dashboard Admin
                </h3>
                    <ul className='manager__list'>
                        <li>
                            <Link >

                            </Link>
                        </li>
                    </ul>
              </div>
              <div className='manager__content'>
                    
              </div>
          </div> : (<div  style={{display:"flex" ,marginTop:"100px"}}>
              <Link style={{color:"red",marginRight:"30px"}} to={routesConfig.home}>Quay lại trang chủ</Link>
              <h3>Bạn không có quyền truy cập page này</h3>
          </div>)}
        </>
    )
}

export default Manager