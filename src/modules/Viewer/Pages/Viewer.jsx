/* eslint-disable react/no-unknown-property */
import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Html, Loader, OrbitControls } from "@react-three/drei";
import GLBModel from "../Components/GlbLoader";
import { DirectionalLightFollowingCamera } from "../Components/DirectionalLight";
import SideMenu from "../Components/SideMenu/SideMenu";
import TextBox from "../Components/TextBox/TextBox";
const Viewer = () => {
  const [annotationMode, setAnnotationMode] = useState(true);
  const [text, setText] = useState("");
  const handleTextChange = (event) => {
    setText(event.target.value);
  };
  const handleAnnotationModeChange = () => {
    console.log(annotationMode);
    setAnnotationMode((prev) => !prev);
  };
  return (
    <>
      <SideMenu value={annotationMode} setValue={handleAnnotationModeChange} />
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
            {annotationMode && (
              <TextBox text={text} handleTextChange={handleTextChange} />
            )}
          </React.Suspense>
          <OrbitControls target={[0, 0, 0]} />
          <DirectionalLightFollowingCamera />
        </Canvas>
      </div>
    </>
  );
};

export default Viewer;
