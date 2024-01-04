import { axiosInstance } from "../../../services/axiosInstance";

export const postAnnotation = async (dots, note, id) => {
  const payload = {
    note: note,
    coordinates: dots,
    project_id: id,
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
