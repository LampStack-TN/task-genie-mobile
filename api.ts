// Import necessary packages
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import config from "./config";

// Define your API URL
const API_URL = config.apiUrl;

export const ApiClient = () => {
  // Create a new axios instance
  const api = axios.create({
    baseURL: API_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Add a request interceptor to add the JWT token to the authorization header
  api.interceptors.request.use(
    async (config) => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  const get = (path: string, params?: any) => {
    return api.get(path, { params }).then((response) => response);
  };

  const post = (path, body, params?) => {
    return api.post(path, body, params).then((response) => response);
  };

  const put = (path, body) => {
    return api.put(path, body).then((response) => response);
  };

  const patch = (path, body, params) => {
    return api.patch(path, body, params).then((response) => response);
  };

  const del = (path) => {
    return api.delete(path).then((response) => response);
  };

  return {
    get,
    post,
    patch,
    put,
    del,
  };
};
