/* eslint-disable react/no-unknown-property */
import PropTypes from "prop-types";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import useRaycaster from "../hooks/useRayCaster";
import { useViewerContext } from "../Context/ViewerContext";

const GLBModel = ({ glbPath, onClick }) => {
  // const modelRef = useRef();
  // const { handleClick, handleUnclick, clickedPoint } = useRaycaster(onClick);
  const { modelRef } = useViewerContext();

  const glb = useLoader(GLTFLoader, glbPath);

  // return (
  //   <mesh
  //     onDoubleClick={handleClick}
  //     onPointerUp={handleUnclick}
  //     ref={modelRef}
  //   >
  //     <primitive object={glb.scene} scale={3} />
  //   </mesh>
  // );
  return <primitive ref={modelRef} object={glb.scene} scale={3} />;
};

GLBModel.propTypes = {
  glbPath: PropTypes.string.isRequired,
};

export default GLBModel;
