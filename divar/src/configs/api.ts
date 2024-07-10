import axios from "axios";
import { getCookie, setCookie } from "../utils/cookies";
import { getNewToken } from "../services/token";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (req) => {
    if (getCookie("accessToken")) {
      req.headers.Authorization = `bearer ${getCookie("accessToken")}`;
    }
    return req;
  },
  (err) => {
    return Promise.reject(err);
  }
);

api.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    if (err.response.status === 401 && !err.config._retry) {
      err.config._retry = true;
      const response = await getNewToken();
      if (!response?.response) return;
      setCookie(response.response.data);
      return api(err.config);
    }
  }
);

export default api;
