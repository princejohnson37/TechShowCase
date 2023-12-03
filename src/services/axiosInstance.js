import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8000", // Replace with your server base URL
  headers: {
    "Content-Type": "application/json",
  },
});
