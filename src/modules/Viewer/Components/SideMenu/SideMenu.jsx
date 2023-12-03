/* eslint-disable react/prop-types */
import { SIDE_MENU_BTNS } from "../../constants";
import "./SideMenu.css";

const SideMenu = ({ handleBtnClick }) => {
  return (
    <div className="side-menu-outer">
      <div className="w-100">
        {Object.values(SIDE_MENU_BTNS).map((button) => {
          return (
            <button
              key={button.btnId}
              className="side-menu-btn"
              onClick={() => handleBtnClick(button.btnId)}
            >
              {button.btnText}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SideMenu;
