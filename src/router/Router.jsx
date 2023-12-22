import { createBrowserRouter } from "react-router-dom";
import HomePage from "../modules/Home/pages/HomePage";
import Viewer from "../modules/Viewer/Pages/Viewer";
import { WebSocketProvider } from "../modules/Viewer/Context/WebSocketContext";

const router = createBrowserRouter([
	{
		path: "/",
		element: <HomePage />,
	},
	{
		path: "/viewer",
		element: (
			<WebSocketProvider>
				<Viewer />,
			</WebSocketProvider>
		),
	},
]);

export default router;
