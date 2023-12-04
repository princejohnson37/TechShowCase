/* eslint-disable react/no-unknown-property */
import { Vector3 } from "three";
import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Loader, OrbitControls } from "@react-three/drei";
import GLBModel from "../Components/GlbLoader";
import SideMenu from "../Components/SideMenu/SideMenu";
import RedDots from "../Components/RedDots/RedDots";
import { DirectionalLightFollowingCamera } from "../Components/DirectionalLight";
import { SIDE_MENU_BTNS } from "../constants";
import RaycastingHandler from "../Components/RayCastingHandler";
import { getAllData } from "../../../services/getAllData";
import { generateUUID } from "three/src/math/MathUtils";

const Viewer = () => {
  const [mode, setMode] = useState("");
  const [text, setText] = useState("");
  const [dots, setDots] = useState([]);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllData();
        return response;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const convertCoordinatesToVector3 = (coordinates) => {
      return new Vector3(coordinates.x, coordinates.y, coordinates.z);
    };

    const fetchDataAndSetDots = async () => {
      const response = await fetchData();

      const dotsWithCoordinates = response.map((item) => ({
        coordinates: convertCoordinatesToVector3(item.coordinates),
        note: item.note,
        file_id: item.file_id,
        id: item.id,
      }));

      setDots(dotsWithCoordinates);
    };

    fetchDataAndSetDots();

    let fetchDataInterval;

    if (mode === SIDE_MENU_BTNS.viewAnnotationBtn.btnId) {
       fetchDataInterval = setInterval(fetchDataAndSetDots, 3000);
    }

    return () => clearInterval(fetchDataInterval);
  }, [mode]);

  const handleBtnClick = (buttonId) => {
    switch (buttonId) {
      case SIDE_MENU_BTNS.annotationBtn.btnId:
        setMode(SIDE_MENU_BTNS.annotationBtn.btnId);
        break;
      case SIDE_MENU_BTNS.viewAnnotationBtn.btnId:
        setMode(SIDE_MENU_BTNS.viewAnnotationBtn.btnId);
        break;
      case SIDE_MENU_BTNS.viewMode.btnId:
        setMode(SIDE_MENU_BTNS.viewMode.btnId);
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
      console.log(point);
      addDot(point);
      setIsClicked(true);
    }
  };

  return (
    <>
      <SideMenu handleBtnClick={handleBtnClick} mode={mode} />
      <div
        style={{
          height: "100vh",
        }}
      >
        <Loader />
        <Canvas camera={{ fov: 75, position: [1, 0.5, 0] }}>
          <directionalLight position={[0, 10, 5]} intensity={1} />
          <GLBModel glbPath={"/models/wolf_skull.glb"} />
          {mode === SIDE_MENU_BTNS.annotationBtn.btnId &&
            isClicked &&
            dots.length > 0 && (
              <RedDots
                position={dots[dots.length - 1]}
                text={text}
                setText={setText}
                isOpen={true}
              />
            )}
          {mode === SIDE_MENU_BTNS.viewAnnotationBtn.btnId &&
            dots.map((values) => {
              return (
                <RedDots
                  key={values.id}
                  position={values.coordinates}
                  setText={setText}
                  text={values.note}
                  isOpen={false}
                  view={true}
                />
              );
            })}
          <RaycastingHandler handleModelClick={handleModelClick} />
          <OrbitControls target={[0, 0, 0]} enableDamping={false} />
          <DirectionalLightFollowingCamera />
        </Canvas>
      </div>
    </>
  );
};

export default Viewer;