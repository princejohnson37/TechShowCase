import { axiosInstance } from "./axiosInstance";

export const getAllData = async (id) => {
  try {
    const response = await axiosInstance.get(`/projects/${id}/annotations/`);
    console.log("get request success", response.data);
    return response.data;
  } catch (error) {
    console.error("Error sending request to server:", error);
    throw error;
  }
};
