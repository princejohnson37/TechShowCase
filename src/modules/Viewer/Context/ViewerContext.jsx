// // useRaycaster.js
import React from 'react';
import * as THREE from 'three';
import PropTypes from 'prop-types'; 

const ViewerContext = React.createContext(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useViewerContext = () => {
  const context = React.useContext(ViewerContext);
  if (context === undefined) {
    throw new Error("used outside provider");
  }
  return context;
}

export const ViewerProvider = ({ children }) => {
  const raycaster = new THREE.Raycaster();
  const modelRef = React.useRef();
  const postTime = React.useState(false);
  const getIntersectPoint = React.useCallback((event, camera) => {
    if (!modelRef.current) return null;

    const mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(modelRef.current, true);

    if (intersects.length > 0) {
      return intersects[0].point;
    }

    return null;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const values = {
    modelRef,
    getIntersectPoint,
    postTime
  };
  return (
    <ViewerContext.Provider value ={values}>
      {children}
    </ViewerContext.Provider>
  );
} 

ViewerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};