import axios from "axios";

const apiClient = axios.create({
  timeout: 15000,
});

apiClient.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error("API Error →", err);
    return Promise.reject(err);
  }
);

export default apiClient;
