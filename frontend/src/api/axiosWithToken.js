import axios from "axios";
import { BASE_URL } from "./apiConstants";

const axiosWithToken = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
});

// Add a request interceptor
axiosWithToken.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Set the token for each request
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosWithToken;
