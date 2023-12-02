/* eslint-disable react/no-unknown-property */
import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { Canvas, useLoader } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { OrbitControls } from '@react-three/drei';

function ObjModel({ objPath }) {
  const obj = useLoader(OBJLoader, objPath);

  
  return <primitive object={obj} />;
}

ObjModel.propTypes = {
  objPath: PropTypes.string.isRequired, 
};

export default function ObjModelLoader({ objPath }) {

  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <React.Suspense fallback={null}>
        <ObjModel objPath={objPath} />
      </React.Suspense>
      <OrbitControls />
    </Canvas>
  );
}

ObjModelLoader.propTypes = {
  objPath: PropTypes.string.isRequired, // Define prop types
};
