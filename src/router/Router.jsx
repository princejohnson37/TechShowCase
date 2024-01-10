import { createBrowserRouter } from "react-router-dom";
import HomePage from "../modules/Home/pages/HomePage";
import Viewer from "../modules/Viewer/Pages/Viewer";
import { WebSocketProvider } from "../modules/Viewer/Context/WebSocketContext";
import Login from "../modules/Login/pages/Login";
import SignUp from "../modules/SignUp/pages/Signup";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Login />,
	},
	{
		path: "/home",
		element: <HomePage />,
	},
	{
		path: "/viewer/:id",
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
	{
		path: "/signup",
		element: <SignUp />,
	},
]);

export default router;
