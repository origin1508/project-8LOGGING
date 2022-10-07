import axios from "axios";
import { AuthFormInitialType } from "@/types/auth/authTypes";

const baseUrl = process.env.REACT_APP_SERVER_BASE_URL;

export async function authRegisterRequest(
  endPoint: string,
  { email, nickname, password }: AuthFormInitialType
) {
  const res = await axios.post(baseUrl + endPoint, {
    email: email,
    nickname: nickname,
    password: password,
  });
  console.log(res);
}

export async function get(endpoint: string, params = "") {
  return axios.get(baseUrl + endpoint + "/" + params, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
    },
  });
}
