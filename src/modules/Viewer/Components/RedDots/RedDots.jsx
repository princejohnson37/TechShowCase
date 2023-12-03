/* eslint-disable react/no-unknown-property */
import PropTypes from "prop-types";
import TextBox from "../TextBox/TextBox";
import { useState } from "react";

const RedDots = ({ position, handleTextChange, text = "", isOpen = false }) => {
  const [isDotClicked, setIsDotClicked] = useState(isOpen);
  return (
    <>
      <mesh
        position={position}
        onClick={() => setIsDotClicked((prev) => !prev)}
      >
        <sphereGeometry args={[0.01]} />
        <meshBasicMaterial color="red" />
      </mesh>
      {isDotClicked && (
        <TextBox
          handleTextChange={handleTextChange}
          text={text}
          position={position}
          setOpen={setIsDotClicked}
        />
      )}
    </>
  );
};

RedDots.propTypes = {
  position: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default RedDots;
