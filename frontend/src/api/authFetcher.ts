import axios from "axios";
import Storage from "@/storage/storage";
import { useSetRecoilState } from "recoil";
import { AuthFormInitialType } from "@/types/auth/authTypes";
import { curUserState } from "@/recoil/atoms/authState";

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
    const setTodoList = useSetRecoilState(curUserState);
    setTodoList(datas);
    Storage.setToken(datas.token);

    return datas;
  } catch (e) {
    return null;
  }
}

export async function get(endpoint: string, params = "") {
  return axios.get(baseUrl + endpoint + "/" + params, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
    },
  });
}
