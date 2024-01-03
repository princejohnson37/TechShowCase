import axios from "axios";

export const axiosInstance = axios.create({
	baseURL: "http://localhost:8000", // Replace with your server base URL
	headers: {
		"Content-Type": "application/json",
	},
});

axiosInstance.interceptors.request.use(
	(config) => {
		const accessToken = JSON.parse(localStorage.getItem("token")).access_token;
		if (accessToken) {
			config.headers["Authorization"] = `Bearer ${accessToken}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);
