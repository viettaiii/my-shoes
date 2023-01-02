

import React from 'react'
import PropTypes from 'prop-types';
import './BackDrop.scss';
function BackDrop({children , show , onClickHideSideSidebar}) {
    const classBackDrop = ['backdrop'];

    const hanleShow = async () => {
       await setTimeout(() => {
            classBackDrop.push('show');
       },500)
    }
    if(show) {
        hanleShow();
    }
  return (
    show && <div className={classBackDrop.join(" ")} onClick={onClickHideSideSidebar}> {children}</div>
  )
}

BackDrop.propTypes = {
  children : PropTypes.node.isRequired,
  show : PropTypes.bool,
  onClickHideSideSidebar : PropTypes.func,
}
export default BackDrop