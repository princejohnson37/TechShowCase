import { createContext, useState } from "react";

const mainContext = createContext();
const MainProvider = ({ children }) => {
	// State to hold the data
	const [currentProjectId, setCurrentProjectId] = useState(null);

	// Function to update the data
	const updateData = (newData) => {
		setCurrentProjectId(newData);
	};

	// Provide the context value to the children
	return (
		<MainProvider.Provider value={{ currentProjectId, updateData }}>
			{children}
		</MainProvider.Provider>
	);
};

export { MainProvider, mainContext };
