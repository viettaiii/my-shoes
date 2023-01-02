import React, { useState } from "react";
import { Link } from "react-router-dom";
import Search from "../Search";
import { AiFillCaretDown } from "react-icons/ai";
import { listMenu } from "../../assets/listMenu";
import "./SideBarMenu.scss";
let oldIndex = 999;
function SideBarMenu() {
  const [list, setListMenu] = useState(listMenu);

  const handleShowSubMenu = (index, submenu) => {
    if (
      (index !== oldIndex && list.length === listMenu.length) ||
      list.length === listMenu.length
    ) {
      const newList = listMenu.slice(0, index + 1);
      const newRest = listMenu.slice(index + 1, listMenu.length);
      const mainList = [...newList, ...submenu, ...newRest];
      setListMenu(mainList);
      oldIndex = index;
    } else if (index === oldIndex) {
      setListMenu(listMenu);
    } else {
      const newList = listMenu.slice(0, index + 1);
      const newRest = listMenu.slice(index + 1, listMenu.length);
      let mainList = [...newList, ...submenu, ...newRest];
      setListMenu(mainList);
      oldIndex = index;
    }
  };
  return (
    <div className="sidebar__tablet">
      <Search sidebarTablet />
      <div className="sidebarmenu">
        {list.map((item, index) => (
          <ul className="sidebarmenu__link" key={index}>
            {item.submenu ? (
              <li
                className="sidebarmenu__item"
                onClick={() => handleShowSubMenu(index, item.submenu)}
              >
                {item.text}
                {item.submenu ? (
                  <AiFillCaretDown className="sidebarmenu__down-icon" />
                ) : (
                  ""
                )}
              </li>
            ) : (
              <Link
                to={item.path}
                className="sidebarmenu__item"
                onClick={() => handleShowSubMenu(index, item.submenu)}
              >
                {item.text}
                {item.submenu   ? (
                  <AiFillCaretDown className="sidebarmenu__down-icon" />
                ) : (
                  ""
                )}
              </Link>
            )}
          </ul>
        ))}
      </div>
    </div>
  );
}

export default SideBarMenu;
