import React  from "react";
import PropTypes from 'prop-types';

import { AiOutlineCaretDown } from "react-icons/ai";
import "./ProductSort.scss";

function ProductSort() {
  const handleSort =(e) => {
      if(e.target.classList.contains('disabled')) {
          return;
      }
    let myParent ;
    let option;
    const optionAll = document.querySelectorAll('.product-sort__option');
      if(e.target.classList.contains('product-sort__selection')){
        myParent = e.target.parentElement;
        option = myParent.querySelector('.product-sort__option');
      }else{
        option = e.target;
        myParent = option.parentElement;
      }
      optionAll.forEach(x => {
          x.classList.remove('show');
      })
      option.classList.toggle('show');
      const liOption = option.querySelectorAll('.product-sort__option__item');
      let selection  = myParent.querySelector('.product-sort__selection');
      Array.from(liOption).forEach(li => {
         li.addEventListener('click' ,() => {
           let text = li.title;
           selection.innerHTML = text.trim();
         })
      })
  }
  const handleTurnOffSort = (e) => {
        const sort = document.querySelectorAll('.product-sort');
        var check = false;
        sort.forEach(x => {
            if(e.target === x ) {
                check = true;
            }
       })
       if(check) {
        const sortOption = document.querySelectorAll('.product-sort__option ');
        sortOption.forEach(x => x.classList.remove('show'));
       }
  }
  document.addEventListener('click' , handleTurnOffSort);
  return (
    <div className="product-sorts">
      <div className="product-sort" onClick={handleSort}>
        <h4 className="product-sort__heading">Chọn Size Giày</h4>
        <div className="product-sort__selection disabled"  >
          Chọn Size Giày
          <AiOutlineCaretDown className="product-sort__icon-down" />
        </div>
        <ul className="product-sort__option disabled" title="1">
        <li className="product-sort__option__item" title="37">
                     37
            </li>
            <li className="product-sort__option__item" title="38">
                      38
            </li>
            <li className="product-sort__option__item" title="39">
                      39
            </li>
            <li className="product-sort__option__item" title="40">
                      40
            </li>
            <li className="product-sort__option__item" title="41">
41
            </li>
            <li className="product-sort__option__item" title="42">
42
            </li>
            <li className="product-sort__option__item" title="43">
43
            </li>
        </ul>
      </div>
      <div className="product-sort" onClick={handleSort}>
        <h4 className="product-sort__heading">Khoảng Giá</h4>
        <div className="product-sort__selection disabled">
          Tất cả
          <AiOutlineCaretDown className="product-sort__icon-down" />
        </div>
        <ul className="product-sort__option disabled" title="2">
            <li className="product-sort__option__item " title="Dưới 3 Triệu">
                   Dưới 3 Triệu
            </li>
            <li className="product-sort__option__item" title=" Từ 3 đến 5 Triệu">
            Từ 3 đến 5 Triệu
            </li>
            <li className="product-sort__option__item" title=" Từ 5 đến 10 Triệu">
            Từ 5 đến 10 Triệu
            </li>
            <li className="product-sort__option__item" title="Từ 10 đến 15 Triệu">
            Từ 10 đến 15 Triệu
            </li>
            <li className="product-sort__option__item" title="Từ 15 đến 20 Triệu">
            Từ 15 đến 20 Triệu
            </li>
            <li className="product-sort__option__item" title="Từ 20 đến 25 Triệu">
            Từ 20 đến 25 Triệu
            </li>
            <li className="product-sort__option__item" title="Từ 25 đến 35 Triệu">
            Từ 25 đến 35 Triệu
            </li>
            <li className="product-sort__option__item" title="Từ 35 đến 60 Triệu">
            Từ 35 đến 60 Triệu
            </li>
        </ul>
      </div>
      <div className="product-sort" onClick={handleSort}>
        <h4 className="product-sort__heading">Giá thấp đến cao</h4>
        <div className="product-sort__selection disabled">
          Giá thấp đến cao
          <AiOutlineCaretDown className="product-sort__icon-down" />
        </div>
        <ul className="product-sort__option disabled" title="3">
            <li className="product-sort__option__item" title="Từ A -> Z">
Từ A -> Z
            </li>
            <li className="product-sort__option__item" title="Từ Z -> A">
Từ Z -> A
            </li>
        </ul>
      </div>
      <div className="product-sort">
        <button className="product-sort__search  disabled" >Tìm kiếm ngay</button>
      </div>
    </div>
  );
}

ProductSort.propTypes = {
 
}
export default ProductSort;
