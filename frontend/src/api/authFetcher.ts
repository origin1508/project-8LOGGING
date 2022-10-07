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
