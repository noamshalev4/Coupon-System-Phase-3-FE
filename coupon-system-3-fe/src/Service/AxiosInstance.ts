import axios from "axios";
import { authStore } from "../Redux/AuthStore";

const axiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = authStore.getState().user.token;
  if (token) {
    config.headers.Authorization = `${String(token)}`;
  }
  return config;
});

export default axiosInstance;
