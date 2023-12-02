/* eslint-disable react/no-unknown-property */
import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { Canvas, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from '@react-three/drei';

function GLBModel({ glbPath }) {
  const glb = useLoader(GLTFLoader, glbPath);

  return <primitive object={glb.scene} />;
}

GLBModel.propTypes = {
  glbPath: PropTypes.string.isRequired, // Define prop types for GLBModel
};

export default function GLBModelLoader({ glbPath }) {

  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <React.Suspense fallback={null}>
        <GLBModel glbPath={glbPath} />
      </React.Suspense>
      <OrbitControls />
    </Canvas>
  );
}

GLBModelLoader.propTypes = {
  glbPath: PropTypes.string.isRequired, // Define prop types for GLBModelLoader
};
