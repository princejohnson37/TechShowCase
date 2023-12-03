// RaycastingHandler.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { useThree } from '@react-three/fiber';
import { useViewerContext } from '../Context/ViewerContext';

const RaycastingHandler = ({ setDots }) => {
  const { camera } = useThree();
  const { getIntersectPoint } = useViewerContext();

  const handleDoubleClick = React.useCallback((event) => {
    const intersectPoint = getIntersectPoint(event, camera);
    if (intersectPoint) {
      setDots(prevDots => [...prevDots, intersectPoint]);
    }
  }, [getIntersectPoint, camera, setDots]);

  React.useEffect(() => {
    window.addEventListener('dblclick', handleDoubleClick);
    return () => window.removeEventListener('dblclick', handleDoubleClick);
  }, [handleDoubleClick]);

  return null;
};

RaycastingHandler.propTypes = {
  setDots: PropTypes.func.isRequired, // setDots is a required function
};

export default RaycastingHandler;
