

import React from 'react'
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
function MenuNav({listMenu ,handleLink }) {
  return (
    <>
        <div className="header__menu">
        <ul className="header__list">
          {listMenu.map((item, index) => (
            <div className="header__link" onClick={e => handleLink(e,item.path)} key={index}>
              <li className="header__item">{item.text}
                {item.submenu && 
                 <>
                 <ul className="header__submenu">
                        {item.submenu.map((subItem,index) => (
                            <li key={index}>
                            <Link className="header__submenu-link" to={subItem.path}>
                                {subItem.text}
                            </Link>
                            </li>
                        ))}
                  </ul>
                 </>
                
                }
              </li>
            </div>
          ))}
        </ul>
      </div>
    </>
  )
}

MenuNav.propTypes = {
  listMenu : PropTypes.array,
  handleLink : PropTypes.func
}
export default MenuNav