import { axiosInstance } from "./axiosInstance";
import { GET } from "./endpoints";

export const getAllData = async () => {
  try {
    const response = await axiosInstance.get(GET.all_data);
    console.log("get request success", response.data);
    return response.data;
  } catch (error) {
    console.error("Error sending request to server:", error);
    throw error;
  }
};
