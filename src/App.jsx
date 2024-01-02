import "./App.css";
import router from "./router/Router";
import { ViewerProvider } from "./modules/Viewer/Context/ViewerContext";
import { RouterProvider } from "react-router-dom";
import { PrimeReactProvider } from 'primereact/api';

function App() {
  return (
    <>
     <PrimeReactProvider>
      <ViewerProvider>
          <RouterProvider router={router} />
      </ViewerProvider>
      </PrimeReactProvider>
    </>
  )
}

export default App;
