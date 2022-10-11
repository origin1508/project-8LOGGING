import axios from "axios";

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
    // 딱히 여기서 무엇을 알려줘야 하는지,,
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
      console.log(error);
      throw new Error(`This is request error!`);
    }
    if (error.response.status >= 500) {
      console.log(error);
      throw new Error(`This is server error!`);
    }
  }
);

export default customAxios;
