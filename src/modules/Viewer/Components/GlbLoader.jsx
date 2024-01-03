/* eslint-disable react/no-unknown-property */
import PropTypes from "prop-types";
import { useViewerContext } from "../Context/ViewerContext";
import useModelLoader from "../hooks/useModelLoader";

const GLBModel = ({ glbPath }) => {

  const { modelRef } = useViewerContext();
  const glb = useModelLoader(glbPath);
  return <primitive ref={modelRef} object={glb.scene} scale={3} />;
};

GLBModel.propTypes = {
  glbPath: PropTypes.string.isRequired,
};

export default GLBModel;
