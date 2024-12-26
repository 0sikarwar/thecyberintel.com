import axios from "axios";

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers["x-auth"] = token;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    const token = response.headers["x-auth"];
    if (token) {
      localStorage.setItem("auth_token", token);
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
