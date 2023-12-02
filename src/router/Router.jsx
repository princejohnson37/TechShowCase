import * as React from "react";
import { createBrowserRouter } from "react-router-dom";
import HomePage from "../modules/Home/pages/HomePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/viewer",
    element: <div>Hello viewer!</div>,
  },
]);

export default router;
