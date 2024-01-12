// RaycastingHandler.jsx
import { useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { useThree } from "@react-three/fiber";
import { useViewerContext } from "../Context/ViewerContext";

const RaycastingHandler = ({ handleModelClick }) => {
  const { camera } = useThree();
  const { getIntersectPoint } = useViewerContext();

  const handleDoubleClick = useCallback(
    (event) => {
      const intersectPoint = getIntersectPoint(event, camera);
      // console.log("intersectPoint", intersectPoint);
      if (intersectPoint) {
        handleModelClick(intersectPoint);
      }
    },
    [getIntersectPoint, camera, handleModelClick]
  );

  useEffect(() => {
    window.addEventListener("dbclick", handleDoubleClick);
    return () => window.removeEventListener("dblclick", handleDoubleClick);
  }, [handleDoubleClick]);

  return null;
};

RaycastingHandler.propTypes = {
  handleModelClick: PropTypes.func.isRequired, // setDots is a required function
};

export default RaycastingHandler;
