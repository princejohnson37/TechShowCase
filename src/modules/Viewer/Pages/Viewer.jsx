/* eslint-disable react/no-unknown-property */
import { Vector3 } from "three";
import { useContext, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Html, Loader, OrbitControls } from "@react-three/drei";
import GLBModel from "../Components/GlbLoader";
import SideMenu from "../Components/SideMenu/SideMenu";
import RedDots from "../Components/RedDots/RedDots";
import { DirectionalLightFollowingCamera } from "../Components/DirectionalLight";
import { SIDE_MENU_BTNS } from "../constants";
import RaycastingHandler from "../Components/RayCastingHandler";
import { useParams } from "react-router-dom";
import { WebSocketContext } from "../Context/WebSocketContext";
import { useViewerContext } from "../Context/ViewerContext";
import { axiosInstance } from "../../../services/axiosInstance";
import { WEBSERVER_URL } from "../../../utils/constants";

const convertCoordinatesToVector3 = (coordinates) => {
	return new Vector3(coordinates.x, coordinates.y, coordinates.z);
};

const Viewer = () => {
	const projectId = useParams().id;
	const { fileId, setFileId, setProjectId } = useViewerContext();

	// api call for getting id
	const getProjectDetails = async () => {
		const response = await axiosInstance.get(`/projects/${projectId}`);
		setFileId(response?.data?.files[0]?.id);
		setProjectId(projectId);
	};

	const [subscribe, unsubscribe, sendMessage] = useContext(WebSocketContext);

	const [mode, setMode] = useState("");
	const [text, setText] = useState("");
	const [dots, setDots] = useState([]);
	const [isClicked, setIsClicked] = useState(false);

	const addDots = (data) => setDots(data);
	useEffect(() => {
		getProjectDetails();
	}, []);

	useEffect(() => {
		const sendMessage = (message) => {
			console.log("Message sent:", message);
		};
		const intervalId = setInterval(() => {
			sendMessage({
				type: "VIEW_ANNOTATION",
			});
		}, 20000); // 2000 milliseconds = 2 seconds
		return () => clearInterval(intervalId);
	}, []);

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
	// 	const fetchDataAndSetDots = async () => {
	// 		const response = await fetchData();
	// 		const dotsWithCoordinates = response.map((item) => ({
	// 			coordinates: convertCoordinatesToVector3(item.coordinates),
	// 			note: item.note,
	// 			file_id: item.file_id,
	// 			id: item.id,
	// 		}));
	// 		setDots(dotsWithCoordinates);
	// 	};
	// 	fetchDataAndSetDots();
	// 	let fetchDataInterval;
	// 	if (mode === SIDE_MENU_BTNS.viewAnnotationBtn.btnId) {
	// 		fetchDataInterval = setInterval(fetchDataAndSetDots, 3000);
	// 	}
	// 	return () => clearInterval(fetchDataInterval);
	// }, [mode]);

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
			<div>
				<SideMenu handleBtnClick={handleBtnClick} mode={mode} />
			</div>
			<div
				style={{
					height: "95vh",
				}}
			>
				<Loader />
				<Canvas
					style={{
						width: "100vw",
					}}
					camera={{ fov: 75, position: [1, 0.5, 0] }}
				>
					<directionalLight position={[0, 10, 5]} intensity={1} />
					<GLBModel glbPath={`${WEBSERVER_URL}/files/${fileId}`} />
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
					<RaycastingHandler handleModelClick={handleModelClick} />
					<OrbitControls target={[0, 0, 0]} enableDamping={false} />
					<DirectionalLightFollowingCamera />
				</Canvas>
			</div>
		</>
	);
};

export default Viewer;
