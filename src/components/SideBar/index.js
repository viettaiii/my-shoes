

import React from 'react';
import PropTypes from 'prop-types';

import { listMenu } from '../../assets/listMenu';
import './Sidebar.scss';
import SideBarMenu from '../SideBarMenu';
function SideBar({show }) {
    const classSidebar = ['sidebar'];
    if(show) {
        classSidebar.push('show');
    }
  return (
    <div className={classSidebar.join(' ')}>
      <SideBarMenu listMenu={listMenu}  />
    </div>
  )
}

SideBar.propTypes = {
  show : PropTypes.bool
}
export default SideBar