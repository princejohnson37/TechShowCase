import router from "./router/Router";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { ViewerProvider } from "./modules/Viewer/Context/ViewerContext";
import { RouterProvider } from "react-router-dom";
import { queryClient } from './services/queryClient';
import "./App.css";


function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ViewerProvider>
        <RouterProvider router={router} />;
      </ViewerProvider>
      <ReactQueryDevtools initialIsOpen={false}/>
    </QueryClientProvider>
  );
}

export default App;
