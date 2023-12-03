/* eslint-disable react/no-unknown-property */
import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Loader, OrbitControls } from "@react-three/drei";
import GLBModel from "../Components/GlbLoader";
import { DirectionalLightFollowingCamera } from "../Components/DirectionalLight";
import SideMenu from "../Components/SideMenu/SideMenu";
import TextBox from "../Components/TextBox/TextBox";
import { SIDE_MENU_BTNS } from "../constants";
import RedDots from "../Components/RedDots/RedDots";
import { useEffect } from "react";

const Viewer = () => {
  const [mode, setMode] = useState("");
  const [text, setText] = useState("");
  const [dots, setDots] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  useEffect(() => {
    console.log("isclicked", isClicked);
  }, [isClicked]);

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

  const addDot = (coordinates) => {
    setDots((prevDots) => [...prevDots, coordinates]);
  };
  const handleModelClick = (point) => {
    if (mode === SIDE_MENU_BTNS.annotationBtn.btnId) {
      addDot(point);
      setIsClicked(true);
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
              onClick={handleModelClick}
            />
            {mode === SIDE_MENU_BTNS.annotationBtn.btnId && isClicked && (
              <>
                <TextBox
                  text={text}
                  handleTextChange={handleTextChange}
                  position={dots[dots.length - 1]}
                />
                {dots.length > 0 && (
                  <RedDots position={dots[dots.length - 1]} />
                )}
              </>
            )}
            {mode === SIDE_MENU_BTNS.viewAnnotationBtn.btnId &&
              dots.map((coordinates, index) => {
                return <RedDots key={index} position={coordinates} />;
              })}
          </React.Suspense>
          <OrbitControls target={[0, 0, 0]} />
          <DirectionalLightFollowingCamera />
        </Canvas>
      </div>
    </>
  );
};

export default Viewer;
