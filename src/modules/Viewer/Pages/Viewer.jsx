/* eslint-disable react/no-unknown-property */
import React from "react";
import { Canvas } from "@react-three/fiber";
import { Loader, OrbitControls } from "@react-three/drei";

import GLBModel from "../Components/GlbLoader";
import SideMenu from "../Components/SideMenu/SideMenu";
import TextBox from "../Components/TextBox/TextBox";
import RedDots from "../Components/RedDots/RedDots";
import { DirectionalLightFollowingCamera } from "../Components/DirectionalLight";
import { SIDE_MENU_BTNS } from "../constants";
import RaycastingHandler from "../Components/RayCastingHandler";
import { postAnnotation } from "../services/postAnnotation";
// import { PostAnnotation } from "../services/postAnnotation";

const Viewer = () => {

  const [mode, setMode] = React.useState("");
  const [text, setText] = React.useState("");
  const [dots, setDots] = React.useState([{ x: 0, y:0, z: 0 }]);
  React.useEffect(() => {
    const len = dots.length;
    if(len>1){
      postAnnotation({
        x: dots[len-1].x,
        y: dots[len-1].y,
        z: dots[len-1].z,
      })
    }
    
  },[dots]);

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleBtnClick = (buttonId) => {
    switch (buttonId) {
      case SIDE_MENU_BTNS.annotationBtn.btnId:
        if (mode === SIDE_MENU_BTNS.annotationBtn.btnId) {
          setMode("");
          return;
        }
        setMode(SIDE_MENU_BTNS.annotationBtn.btnId);
        break;
      case SIDE_MENU_BTNS.viewAnnotationBtn.btnId:
        if (mode === SIDE_MENU_BTNS.viewAnnotationBtn.btnId) {
          setMode("");
          return;
        }
        setMode(SIDE_MENU_BTNS.viewAnnotationBtn.btnId);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <SideMenu handleBtnClick={handleBtnClick} />
      <div
        style={{
          height: "100vh",
        }}
      >
        <Loader />
        <Canvas camera={{ fov: 75, position: [1, 0.5, 0] }}>
          <directionalLight position={[0, 10, 5]} intensity={1} />
          <React.Suspense fallback={null}>
            <GLBModel
              glbPath={"/models/wolf_skull.glb"}
            />
            {mode === SIDE_MENU_BTNS.annotationBtn.btnId && (
              <TextBox text={text} handleTextChange={handleTextChange} />
            )}
            {dots.map((coordinates, index) => {
              console.log("something happend");
              return <RedDots key={index} position={coordinates} />;
            })}
            <RaycastingHandler setDots={setDots}/>
          </React.Suspense>
          <OrbitControls target={[0, 0, 0]} />
          <DirectionalLightFollowingCamera />
        </Canvas>
      </div>
    </>
  );
};

export default Viewer;
