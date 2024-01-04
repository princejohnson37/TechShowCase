import { axiosInstance } from "../../../services/axiosInstance";

export const deleteAnnotation = async (id) => {
  try {
    const response = await axiosInstance.delete(`/annotations/${id}`);
    console.log("delete request success", response.data);
    return response.data;
  } catch (error) {
    console.error("Error sending request to server:", error);
    throw error;
  }
};
