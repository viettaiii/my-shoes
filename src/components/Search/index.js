import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Tippy from "@tippyjs/react/headless";
import { useSelector } from "react-redux";
import { AiOutlineLoading3Quarters, AiOutlineSearch } from "react-icons/ai";
import 'tippy.js/dist/tippy.css';
import './Search.scss';
import ProductSmall from "../ProductSmall";
import useDebounce from '../../hooks/useDebounce';

function Search({ sidebarTablet }) {
  const [searchValue , setSearchValue] = useState("");
  const getProduct = useSelector(state => state.getProducts);
  const {products   } = getProduct;
  const [list , setList] = useState([]);
  const [isSearching , setIsSearching] = useState(false);
  const classSearch = ["header__search"];
  if (sidebarTablet) {
    classSearch.push("sidebar-tablet");
  }

  const debounceSearch = useDebounce(searchValue,500);
  var value = "";
  useEffect(() => {
    if(!debounceSearch.trim()) {
      document.querySelector('.header__search').classList.remove('loading');
      return;
    }
      if(debounceSearch) {
        setIsSearching(true);
       value = debounceSearch.toUpperCase().trim();
       handleProductList();
          setIsSearching(false);
          document.querySelector('.header__search').classList.remove('loading');
      }else{
        setList([]);
        setIsSearching(false);
      }
  },[debounceSearch])
  const handleValueSearch = (e) => {
    document.querySelector('.header__search').classList.add('loading');
      setSearchValue(e.target.value.trim())
  }
  const handleProductList = () => {
    setList(products.filter(product => 
      product.name.toUpperCase().trim().includes(value) || 
      product.gender.toUpperCase().trim().includes(value) || 
      product.size.toUpperCase().trim().includes(value) || 
      product.price.toUpperCase().trim().includes(value) ||
      product.state.toUpperCase().trim().includes(value) 
      ));
  }
  return (
    <div className="wrapper-search" >
      <Tippy
        visible={debounceSearch && list.length > 0  ? true : false}
        interactive
        placement="bottom-start"
        render={attrs => (
          <div className="search" tabIndex="-1" {...attrs}>
              <ProductSmall products={list}/>
          </div>
        )}
       
      >
        <div className={classSearch.join(" ")}>
          <input

            onChange={handleValueSearch}
            className={`header__input ${
              sidebarTablet ? "sidebar__tablet-input" : ""
            }`}
            type="text"
            name="search"
            placeholder="Nhập từ cần tìm"
          />
         <AiOutlineSearch className="header__icon-search"/>
        <AiOutlineLoading3Quarters className="header__icon-loading" />  
        </div>
      </Tippy>
    </div>
  );
}

Search.propTypes = {
  sidebarTablet: PropTypes.bool,
};

export default Search;
