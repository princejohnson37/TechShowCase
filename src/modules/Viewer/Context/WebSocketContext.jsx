import { createContext, useEffect, useRef } from "react";
import { useViewerContext } from "./ViewerContext";
import { WS_URL } from "../../../utils/constants";

const WebSocketContext = createContext();

// eslint-disable-next-line react/prop-types
const WebSocketProvider = ({ children }) => {
	
	const { projectId: id } = useViewerContext();

	const ws = useRef(null);
	const channels = useRef({}); // maps each channel to the callback

	const subscribe = (channel, callback) => {
		channels.current[channel] = callback;
	};

	const unsubscribe = (channel) => {
		delete channels.current[channel];
	};

	const sendMessage = (message) => {
		ws.current?.send(JSON.stringify(message));
	};

	useEffect(() => {
		ws.current = new WebSocket(`${WS_URL}/projects/${id}/annotations`);
		ws.current.onopen = () => {
			console.log("WS open");
			// Example: sending a message when the WebSocket is opened
			// ws.current?.send(JSON.stringify({ action: 'setName', name }));
		};
		ws.current.onclose = () => {
			console.log("WS close");
		};
		ws.current.onmessage = (message) => {
			const data = JSON.parse(message.data);
			const wsIdentifier = id;

			if (channels.current[wsIdentifier]) {
				channels.current[wsIdentifier](data);
			} else {
				channels.current[wsIdentifier] = data;
			}
		};

		return () => {
			ws.current.close();
		};
	}, [id]);

	return (
		<WebSocketContext.Provider value={[subscribe, unsubscribe, sendMessage]}>
			{children}
		</WebSocketContext.Provider>
	);
};

export { WebSocketContext, WebSocketProvider };
