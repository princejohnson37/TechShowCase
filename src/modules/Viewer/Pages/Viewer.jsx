/* eslint-disable react/no-unknown-property */
import React from "react";
import { Canvas } from "@react-three/fiber";
import { Circle, Loader, OrbitControls } from "@react-three/drei";
import GLBModel from "../Components/GlbLoader";
import { DirectionalLightFollowingCamera } from "../Components/DirectionalLight";
const Viewer = () => {
  return (
    <div
      style={{
        height: "100vh",
      }}
    >
      <Loader />
      <Canvas camera={{ fov: 75, position: [1, 0.5, 0] }}>
        <directionalLight position={[0, 10, 5]} intensity={1} />
        <React.Suspense fallback={null}>
          <GLBModel glbPath={"/models/wolf_skull.glb"} />
        </React.Suspense>
        <OrbitControls target={[0, 0, 0]} />
        <DirectionalLightFollowingCamera />
      </Canvas>
    </div>
  );
};

export default Viewer;
