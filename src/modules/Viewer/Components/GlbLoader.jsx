/* eslint-disable react/no-unknown-property */
import PropTypes from "prop-types";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const GLBModel = ({ glbPath }) => {
  const glb = useLoader(GLTFLoader, glbPath);
  return <primitive object={glb.scene} scale={2}/>;
};

GLBModel.propTypes = {
  glbPath: PropTypes.string.isRequired,
};
export default GLBModel;
