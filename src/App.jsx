import "./App.css";
import router from "./router/Router";
import { ViewerProvider } from "./modules/Viewer/Context/ViewerContext";
import { RouterProvider } from "react-router-dom";

function App() {
  return (
    <>
      <ViewerProvider>
        <RouterProvider router={router} />;
      </ViewerProvider>
    </>
  )
}

export default App;
