/* eslint-disable react/no-unknown-property */
import PropTypes from "prop-types";
import { useRef } from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import useRaycaster from "../hooks/useRayCaster";

const GLBModel = ({ glbPath, onClick }) => {
  const modelRef = useRef();
  const { handleClick, handleUnclick, clickedPoint } = useRaycaster(onClick);

  const glb = useLoader(GLTFLoader, glbPath);

  return (
    <mesh onClick={handleClick} onPointerUp={handleUnclick} ref={modelRef}>
      <primitive object={glb.scene} scale={2} />
    </mesh>
  );
};

GLBModel.propTypes = {
  glbPath: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default GLBModel;
