import { createBrowserRouter } from "react-router-dom";
import HomePage from "../modules/Home/pages/HomePage";
import Viewer from "../modules/Viewer/Pages/Viewer";
import { WebSocketProvider } from "../modules/Viewer/Context/WebSocketContext";
import Login from "../modules/Auth/Login";

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
	{
		path: "/login",
		element: <Login />,
	},
]);

export default router;
