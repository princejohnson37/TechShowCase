import { useState } from "react";
import { useThree, useFrame, extend } from "@react-three/fiber";
import { Raycaster } from "three";

extend({ Raycaster });

const useRaycaster = (onClick) => {
  const { camera, mouse, scene } = useThree();
  const raycaster = new Raycaster();
  let isClicked = false;
  const [isClicked2, setIsClicked2] = useState(false);
  const [clickedPoint, setClickedPoint] = useState(null);

  const handleClick = () => {
    isClicked = true;
    setIsClicked2(true);
  };

  const handleUnclick = () => {
    isClicked = false;
    setIsClicked2(false);
  };

  useFrame(() => {
    if (isClicked2) {
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children);

      const firstIntersectWithFace = intersects.find(
        (intersect) => intersect.faceIndex !== null
      );

      if (firstIntersectWithFace) {
        setClickedPoint(firstIntersectWithFace.point);
        onClick(firstIntersectWithFace.point);
      }
      setIsClicked2(false);

      // isClicked = false;
    }
  });

  return { handleClick, handleUnclick, clickedPoint };
};

export default useRaycaster;
