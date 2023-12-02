/* eslint-disable react/no-unknown-property */
import React from 'react';
import { useFrame, useThree } from '@react-three/fiber';

const DirectionalLightFollowingCamera = () => {
  const { camera } = useThree();
  const lightRef = React.useRef(null);
  const lightHelperRef = React.useRef(null);

  useFrame(() => {
    if (lightRef.current) {
      lightRef.current.position.copy(camera.position);
      camera.getWorldDirection(lightRef.current.target.position);
      if (lightHelperRef.current) {
        lightHelperRef.current.update();
      }
    }
  });

  return (
    <>
      <directionalLight ref={lightRef} color="white" intensity={1} />
      {lightRef.current && (
        <directionalLightHelper
          ref={lightHelperRef}
          args={[lightRef.current]}
        />
      )}
    </>
  );
};

DirectionalLightFollowingCamera.propTypes = {};

export { DirectionalLightFollowingCamera };
