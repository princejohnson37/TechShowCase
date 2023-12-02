import { createBrowserRouter } from "react-router-dom";
import HomePage from "../modules/Home/pages/HomePage";
import Viewer from "../modules/Viewer/Pages/Viewer";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/viewer",
    element: <Viewer/>,
  },
]);

export default router;
