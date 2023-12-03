/* eslint-disable react/no-unknown-property */
import PropTypes from "prop-types";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import { useViewerContext } from "../Context/ViewerContext"; 

const GLBModel = ({ glbPath }) => {
  const { modelRef } = useViewerContext(); 


  const glb = useLoader(GLTFLoader, glbPath);

  return (
    <primitive
      object={glb.scene}
      scale={2}
      ref={modelRef}
    />
  );
};

GLBModel.propTypes = {
  glbPath: PropTypes.string.isRequired,
};

export default GLBModel;
