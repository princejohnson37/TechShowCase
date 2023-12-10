import "./App.css";
import router from "./router/Router";
import { ViewerProvider } from "./modules/Viewer/Context/ViewerContext";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

function App() {
  const queryClient = new QueryClient();
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
