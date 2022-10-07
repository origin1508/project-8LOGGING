import axios from "axios";
import Storage from "@/storage/storage";

const baseUrl = process.env.REACT_APP_SERVER_BASE_URL;

const customAxios = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${Storage.getToken()}`,
  },
  timeout: 3000,
});

// request, response 예외처리 어떻게? 찾아보자...
// customAxios.interceptors.request.use(() => {})

export default customAxios;
