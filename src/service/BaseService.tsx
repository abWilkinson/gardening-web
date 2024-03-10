import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const client = axios.create({
    baseURL: BASE_URL
 });

 const errorHandler = (error: { response: { status: any; }; }) => {
    const statusCode = error.response?.status
  
    // logging only errors that are not 401
    if (statusCode && statusCode !== 401) {
      console.error(error)
    }
  
    return Promise.reject(error)
  }

  client.interceptors.response.use(undefined, (error) => {
    return errorHandler(error)
  })