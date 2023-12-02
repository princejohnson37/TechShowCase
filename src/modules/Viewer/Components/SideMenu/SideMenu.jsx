/* eslint-disable react/prop-types */
import "./SideMenu.css";

const SideMenu = ({ value, setValue }) => {
  return (
    <div className="side-menu-outer">
      <div className="w-100">
        <button className="side-menu-btn" onClick={setValue} value={value}>
          AnnotationMode {value ? "On" : "Off"}
        </button>
      </div>
    </div>
  );
};

export default SideMenu;
