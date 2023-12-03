// api.js
import Axios from 'axios';

const axiosInstance = Axios.create({
  baseURL: 'http://localhost:8000', // Replace with your server base URL
  headers: {
    'Content-Type': 'application/json'
  }
});

export const postAnnotation = async (dots) => {
  const payload ={
    "note": 'notes',
    "coordinates": dots,
    "file_id": 1
  };
  console.log("payload --> ",payload);
  try {
    console.log('post');
    const response = await axiosInstance.post('/annotations', payload);
    return response.data;
  } catch (error) {
    console.error('Error sending dots to server:', error);
    throw error; 
  }
};
