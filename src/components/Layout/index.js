


import React, { useState } from 'react'
import Header from './Header';
import Footer from './Footer';
import BackDrop from "../BackDrop";
import SideBar from '../SideBar';
function Layout({children }) {

  const [showSideBar , setShowSideBar] = useState(false);

  const handelHideSidebar = (e) => {
    const backDrop = document.querySelector('.backdrop');
    if((backDrop === e.target)) {
      setShowSideBar(false);
    } 
  }
  return (
    <>
            <BackDrop show={showSideBar} onClickHideSideSidebar={handelHideSidebar }>
        <SideBar show={showSideBar} />
      </BackDrop>
        <Header onClickShowSidebar={() => setShowSideBar(true)}/>
        {children}
        <Footer />
    </>
  )
}

export default Layout