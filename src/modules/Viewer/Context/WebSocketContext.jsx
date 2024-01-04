import { createContext, useEffect, useRef } from "react";

const WebSocketContext = createContext();

const WebSocketProvider = ({ children }) => {
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
		ws.current = new WebSocket("ws://127.0.0.1:8000/projects/1/annotations");
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
			const wsIdentifier = '1';

			if (channels.current[wsIdentifier]) {
				channels.current[wsIdentifier](data);
			} else {
				channels.current[wsIdentifier] = data;
			}
		};

		return () => {
			ws.current.close();
		};
	}, []);

	return (
		<WebSocketContext.Provider value={[subscribe, unsubscribe, sendMessage]}>
			{children}
		</WebSocketContext.Provider>
	);
};

export { WebSocketContext, WebSocketProvider };
