/* eslint-disable react/no-unknown-property */
import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import GLBModel from "../Components/GlbLoader";
const Viewer = () => {
  return (
    <>
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <React.Suspense fallback={null}>
          <GLBModel glbPath={'/models/wolf_skull.glb'} />
        </React.Suspense>
        <OrbitControls />
      </Canvas>
    </>
  );
};
export default Viewer;
