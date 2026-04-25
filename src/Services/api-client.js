// import axios from "axios";
// import { API_CONFIG } from "../Config";

// export const apiClient=axios.create({
//     baseURL:API_CONFIG.baseURL,
//     timeout:3000000
// });
import axios from "axios";
import { API_CONFIG } from "../Config";

export const apiClient = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: 3000000
});

 
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);


 