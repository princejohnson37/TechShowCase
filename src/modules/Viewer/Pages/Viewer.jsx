/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
import { useEffect, useState, useContext } from "react";
import { Canvas } from "@react-three/fiber";
import { Loader, OrbitControls } from "@react-three/drei";
import { Vector3 } from "three";
import { useParams } from "react-router-dom";
import { Button } from "primereact/button";

import NavBar from "../../Common/Components/NavBar";
import GLBModel from "../Components/GlbLoader";
import SideMenu from "../Components/SideMenu/SideMenu";
import RedDots from "../Components/RedDots/RedDots";
import ShareModal from "../Components/SideMenu/ShareModal";

import { useViewerContext } from "../Context/ViewerContext";
import { WebSocketContext } from "../Context/WebSocketContext";
import { DirectionalLightFollowingCamera } from "../Components/DirectionalLight";
import { SIDE_MENU_BTNS } from "../constants";
import { axiosInstance } from "../../../services/axiosInstance";
import { WEBSERVER_URL } from "../../../utils/constants";

import RaycastingHandler from "../Components/RayCastingHandler";
import useViewerLoad from "../hooks/useViewerLoad";

import "./Viewer.css";

const convertCoordinatesToVector3 = (coordinates) => {
	return new Vector3(coordinates.x, coordinates.y, coordinates.z);
};

const Viewer = () => {
	useViewerLoad();
	const projectId = useParams().id;
	const { fileId, setFileId, setProjectId } = useViewerContext();

	const [mode, setMode] = useState(SIDE_MENU_BTNS.viewMode.btnId);

	const [shareModalVisibility, setShareModalVisibility] = useState(false);

	const [dots, setDots] = useState([]);
	useEffect(() => console.log("dots --> ", dots), [dots]);

	const [isClicked, setIsClicked] = useState(false);

	const [text, setText] = useState("");

	const getProjectDetails = async () => {
		const response = await axiosInstance.get(`/projects/${projectId}`);
		setFileId(response?.data?.files[0]?.id);
		setProjectId(projectId);
	};

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
	const areCoordinatesEqual = (coord1, coord2) => {
		return coord1.x === coord2.x && coord1.y === coord2.y && coord1.z === coord2.z;
	};

	const addDot = (coordinates) => {
		setDots((prevDots) => {
			if (
				prevDots.length === 0 ||
				!areCoordinatesEqual(prevDots[prevDots.length - 1], coordinates)
			) {
				return [...prevDots, coordinates];
			}
			return prevDots;
		});
	};

	// Helper function to compare two coordinates

	const handleModelClick = (event) => {
		if (mode === SIDE_MENU_BTNS.annotationBtn.btnId) {
			console.log("point -> ", event.intersections[0].point);
			addDot(event.intersections[0].point);
			setIsClicked(true);
		}
	};

	useEffect(() => {
		if (mode !== SIDE_MENU_BTNS.annotationBtn.btnId) setIsClicked(false);
	}, [mode]);

	useEffect(() => {
		getProjectDetails();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [projectId]);
	const [subscribe, unsubscribe, sendMessage] = useContext(WebSocketContext);

	const addDots = (data) => setDots(data);

	// useEffect(() => {
	//   const sendMessage = (message) => {
	//     console.log("Message sent:", message);
	//   };
	//   const intervalId = setInterval(() => {
	//     sendMessage({
	//       type: "VIEW_ANNOTATION",
	//     });
	//   }, 20000); // 2000 milliseconds = 2 seconds
	//   return () => clearInterval(intervalId);
	// }, []);

	useEffect(() => {
		if (mode === SIDE_MENU_BTNS.viewAnnotationBtn.btnId) {
			sendMessage({
				type: "VIEW_ANNOTATION",
			});
			subscribe(projectId, (data) => {
				console.log(data);
				const dotsWithCoordinates = data.map((item) => ({
					coordinates: convertCoordinatesToVector3(item.coordinates),
					note: item.note,
					id: item.id,
				}));
				console.log(dotsWithCoordinates);
				addDots(dotsWithCoordinates);
				// addDots(data);
				console.log(dots);
			});
		} else unsubscribe(projectId);
		return () => {
			unsubscribe(projectId);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [mode, subscribe]);

	// useEffect(() => {
	//   const fetchDataAndSetDots = async () => {
	//     const response = await fetchData();
	//     const dotsWithCoordinates = response.map((item) => ({
	//       coordinates: convertCoordinatesToVector3(item.coordinates),
	//       note: item.note,
	//       file_id: item.file_id,
	//       id: item.id,
	//     }));
	//     setDots(dotsWithCoordinates);
	//   };
	//   fetchDataAndSetDots();
	//   let fetchDataInterval;
	//   if (mode === SIDE_MENU_BTNS.viewAnnotationBtn.btnId) {
	//     fetchDataInterval = setInterval(fetchDataAndSetDots, 3000);
	//   }
	//   return () => clearInterval(fetchDataInterval);
	// }, [mode]);

	return (
		<>
			<div>
				<NavBar />
			</div>
			{/* <div style={{ display: "flex", height: "", marginTop: "7vh" }}>
        <div
          style={{
            // width: "20%",
            // borderRight: "solid",
            // borderRightColor: "#fff",
            // borderRightWidth: "1px",
            // paddingLeft: "1%",
          }}
        > */}
			<div>
				<SideMenu handleBtnClick={handleBtnClick} mode={mode} />
				<Button
					className="live-share-btn"
					label='live share'
					icon='pi pi-share-alt'
					iconPos='left'
					onClick={() => setShareModalVisibility(true)}
				/>
			</div>

			{/* </div> */}
			<div style={{ height: "95vh" }}>
				<Loader />
				<Canvas camera={{ fov: 75, position: [1, 0.5, 0] }}>
					<directionalLight position={[0, 10, 5]} intensity={1} />
					<GLBModel
						glbPath={`${WEBSERVER_URL}/files/${fileId}`}
						handleModelClick={handleModelClick}
					/>
					{mode === SIDE_MENU_BTNS.annotationBtn.btnId && isClicked && dots.length > 0 && (
						<RedDots
							position={dots[dots.length - 1]}
							text={text}
							setText={setText}
							isOpen={isClicked}
						/>
					)}
					{mode === SIDE_MENU_BTNS.viewAnnotationBtn.btnId &&
						dots.map((values) => {
							return (
								<RedDots
									key={values.id}
									id={values.id}
									position={values.coordinates}
									setText={setText}
									text={values.note}
									isOpen={false}
									view={true}
								/>
							);
						})}
					{/* <RaycastingHandler handleModelClick={handleModelClick} /> */}
					<OrbitControls target={[0, 0, 0]} enableDamping={false} />
					<DirectionalLightFollowingCamera />
				</Canvas>
			</div>
			<ShareModal
				visible={shareModalVisibility}
				setVisible={setShareModalVisibility}
				projectId={projectId}
			/>
		</>
	);
};

export default Viewer;
