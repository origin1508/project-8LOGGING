import axios from "axios";
import Storage from "@/storage/storage";
import { AuthFormInitialType } from "@/types/auth/authTypes";

const baseUrl = process.env.REACT_APP_SERVER_BASE_URL;

export async function authRegisterRequest(
  endPoint: string,
  { email, nickname, password }: AuthFormInitialType
) {
  try {
    const res = await axios.post(baseUrl + endPoint, {
      email: email,
      nickname: nickname,
      password: password,
    });
    const { success } = res.data;
    return success;
  } catch (e) {
    return null;
  }
}

export async function authLoginRequest(
  endPoint: string,
  { email, password }: AuthFormInitialType
) {
  try {
    const res = await axios.post(baseUrl + endPoint, {
      email: email,
      password: password,
    });
    const { datas } = res.data;
    Storage.setToken(datas.token);
    return datas;
  } catch (e) {
    return null;
  }
}
