/* eslint-disable react/no-unknown-property */
import PropTypes from "prop-types";
import { useViewerContext } from "../Context/ViewerContext";
import useModelLoader from "../hooks/useModelLoader";

const GLBModel = ({ glbPath, handleModelClick }) => {
  // const handleDoubleClick = (event) => {
  //   // Log the intersection point
  //   console.log('click',event.intersections[0].point);
  // };
  const { modelRef } = useViewerContext();
  const glb = useModelLoader(glbPath);
  return <primitive ref={modelRef} object={glb.scene} scale={3} onDoubleClick={handleModelClick}/>;
};

GLBModel.propTypes = {
  glbPath: PropTypes.string.isRequired,
  handleModelClick: PropTypes.func.isRequired
};

export default GLBModel;
