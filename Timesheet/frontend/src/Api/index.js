import axios from "axios";
import { getAccessToken } from "../utils/localStorage";

const axiosInstance = axios.create({
  baseURL: '',
  timeout: 25000,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  },
  withCredentials: false,
});

axiosInstance.interceptors.request.use((request) => {
  const accessToken = getAccessToken();
  const accessHeader = `Bearer ${accessToken}`;
  if (request.headers) { 
    request.headers["Authorization"] = accessHeader;
  }
  return request;
});

export default axiosInstance;
