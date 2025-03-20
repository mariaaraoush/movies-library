import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://testing.abi-edu.net",
});

axiosInstance.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] =
      "Bearer 3|z1mCgNOy8C8s4458frEu6tLjFVPF1GM2KZIggXQvf388e14f";

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default axiosInstance;
