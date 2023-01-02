import React, { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

import ListProduct from "../../components/ListProduct";
import { useSelector } from "react-redux";
import { URL } from "../../urlApi";
function ProductNavigation({  nike }) {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState();
  const getProductAll = useSelector((state) => state.getProducts);
  const { products: list } = getProductAll;


  useEffect(() => {
    const getProductNavigation = async () => {
      try {
        const { data } = await axios.get(`${URL}/api/product`, {
          params: {
            page: page,
          },
        });
        setProducts(data.results);
        setTotalPage(data.total_pages);
      } catch (err) {
        console.log("ERROR", err);
      }
    };
    getProductNavigation();
  }, [page]);
  const handlePage = (e) => {
    const btns = document.querySelectorAll(".main-product__btn-more button");
    let element = e.target;
    if (btns) {
      btns.forEach((x) => {
        Object.assign(x.style, {
          background: "initial",
          color: "initial",
        });
      });
    }
    if (element === document.querySelector(".main-product__btn-more")) {
      Object.assign(btns[page].style, {
        background: "red",
        color: "white",
      });
      return;
    }
    let newPage;
    if (element) {
      switch (element.title) {
        case "prev":
          newPage = parseInt(page - 1);
          element = btns[page - 1];
          console.log(newPage);
          break;
        case "1":
          newPage = parseInt(element.title);
          break;
        case "2":
          newPage = parseInt(element.title);
          break;
        case "3":
          newPage = parseInt(element.title);
          break;
        case "4":
          newPage = parseInt(element.title);
          break;
        case "5":
          newPage = parseInt(element.title);
          break;
        case "6":
          newPage = parseInt(element.title);
          break;
        case "7":
          newPage = parseInt(element.title);
          break;
        case "8":
          newPage = parseInt(element.title);
          break;
        case "next":
          newPage = parseInt(page + 1);
          if (page === 1) {
            element = btns[page];
          } else {
            element = btns[page + 1];
          }
          console.log(newPage);
          break;
        default:
          break;
      }
      setPage(newPage);
      Object.assign(element.style, {
        background: "red",
        color: "white",
      });
    }
  };
  return (
    <>
      {products.length <= 0 ? (
        "Không có sản phẩm nào"
      ) : (
        <>
          <ListProduct
            discount
            mainProduct
            news
            homeProducts
            products={products.filter((item) =>
              nike ? item.trademark === "NIKE" : item
            )}
          />

          {!nike && (
            <div className="main-product__btn-more" onClick={handlePage}>
              {!(page === 1) && <button title="prev">Prev</button>}
              {[...Array(totalPage).keys()].map((x) => (
                <button key={x + 1} title={x + 1}>
                  {x + 1}
                </button>
              ))}
              {page < totalPage && <button title="next">Next</button>}
            </div>
          )}
        </>
      )}
    </>
  );
}

ProductNavigation.propTypes = {
  nike: PropTypes.bool,
};
export default ProductNavigation;
