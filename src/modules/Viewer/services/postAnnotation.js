import { axiosInstance } from "../../../services/axiosInstance";

export const postAnnotation = async (dots, note, projectId) => {
	const payload = {
		note: note,
		coordinates: dots,
		color: "#FF0000"
	};
	console.log("payload --> ", payload);
	try {
		const response = await axiosInstance.post(`/projects/${projectId}/annotations`, payload);
		console.log("post request success", response.data);
		return response.data;
	} catch (error) {
		console.error("Error sending request to server:", error);
		throw error;
	}
};
