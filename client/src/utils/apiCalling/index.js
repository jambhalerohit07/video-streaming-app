import { addToast } from "@heroui/react";
import axios from "axios";

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

export const axiosInstance = axios.create({
  baseURL: "http://localhost:4001/api",
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    
    console.warn("Request Payload====>", config.data);
    const accessToken = sessionStorage.getItem("token");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = "Bearer " + token;
            return axiosInstance(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const { data } = await axiosInstance.post("/auth/refresh-token");

        const newAccessToken = data?.data;

        sessionStorage.setItem("token", newAccessToken);
        axiosInstance.defaults.headers.common["Authorization"] =
          `Bearer ${newAccessToken}`;

        processQueue(null, newAccessToken);
        isRefreshing = false;

        originalRequest.headers["Authorization"] = "Bearer " + newAccessToken;

        return axiosInstance(originalRequest);
      } catch (err) {
        processQueue(err, null);
        isRefreshing = false;
        return Promise.reject(err);
      }
    }

    if (error) {
      addToast({
        title: error?.response?.data?.error?.message || error?.message,
        color: "danger",
      });
    }

    return Promise.reject(error);
  },
);
