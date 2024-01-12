import router from "./router/Router";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "./services/queryClient";
import { ViewerProvider } from "./modules/Viewer/Context/ViewerContext";
import { RouterProvider } from "react-router-dom";
import { PrimeReactProvider } from "primereact/api";
import "./App.css";

function App() { 
	return (
		<QueryClientProvider client={queryClient}>
			<PrimeReactProvider>
				<ViewerProvider>
					<RouterProvider router={router} />
				</ViewerProvider>
			</PrimeReactProvider>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}

export default App;
