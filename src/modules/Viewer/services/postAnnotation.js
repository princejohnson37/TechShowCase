// api.js
import { axiosInstance } from "../../../services/axiosInstance";

export const postAnnotation = async (dots, note) => {
  const payload = {
    note: note,
    coordinates: dots,
    file_id: 1,
  };
  console.log("payload --> ", payload);
  try {
    const response = await axiosInstance.post("/annotations", payload);
    console.log("post request success", response.data);
    return response.data;
  } catch (error) {
    console.error("Error sending request to server:", error);
    throw error;
  }
};
