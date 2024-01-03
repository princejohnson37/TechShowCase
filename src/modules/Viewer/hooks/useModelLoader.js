import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useEffect, useState } from "react";
const useModelLoader = (glbPath) => {
  const [modelUrl, setModelUrl] = useState(glbPath);
  const accessToken = JSON.parse(localStorage.getItem('token'))?.access_token;
  
  
  useEffect(() => {
    const fetchModel = async () => {
      if (!accessToken) return;
      try {
        const response = await fetch(glbPath, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setModelUrl(url);
      } catch (error) {
        console.error("Error fetching the GLB model:", error);
      }
    };

    fetchModel();
    return () => {
      if (modelUrl !== glbPath) {
        URL.revokeObjectURL(modelUrl);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  const glb = useLoader(GLTFLoader, modelUrl);
  return glb;
};

export default useModelLoader;