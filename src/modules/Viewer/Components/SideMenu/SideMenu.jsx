/* eslint-disable react/prop-types */
import { useState } from "react";
import { SIDE_MENU_BTNS } from "../../constants";
import "./SideMenu.css";

const SideMenu = ({ handleBtnClick, mode }) => {
  const [active, setActive] = useState(mode);
  return (
    <div className="">
      <div className="w-100">
        {Object.values(SIDE_MENU_BTNS).map((button) => {
          return (
            <button
              data-selected={active === button.btnId}
              key={button.btnId}
              className={"side-menu-btn"}
              onClick={() => {
                handleBtnClick(button.btnId);
                setActive(button.btnId);
              }}
            >
              {button.btnText}
            </button>
          );
        })}
      </div>
      <div className="side-menu-footer" style={{ paddingLeft: '5%', marginBottom: '5%' }}>
        {mode != "" ? `Mode : ${mode}` : ""}
      </div>
    </div>
  );
};

export default SideMenu;
