/* eslint-disable react/no-unknown-property */
import PropTypes from "prop-types";
import { useRef } from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const GLBModel = ({ glbPath, onClick }) => {
  const modelRef = useRef();

  const handleClick = (event) => {
    const intersects = event.point;
    onClick(intersects);
  };

  const glb = useLoader(GLTFLoader, glbPath);

  return (
    <primitive
      object={glb.scene}
      scale={2}
      ref={modelRef}
      onClick={handleClick}
    />
  );
};

GLBModel.propTypes = {
  glbPath: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default GLBModel;
