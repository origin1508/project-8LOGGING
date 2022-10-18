import axios, { AxiosError } from "axios";

const baseUrl = process.env.REACT_APP_SERVER_BASE_URL;

const customAxios = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 3000,
});

customAxios.interceptors.request.use(
  (req) => {
    return req;
  },
  (error) => {
    throw new Error(`This is error! ${error}`);
  }
);

customAxios.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    if (error.response.status >= 400 && error.response.status < 500) {
      return Promise.reject(error);
    } else if (error.response.status >= 500) {
      return AxiosError;
    }
  }
);

export default customAxios;
