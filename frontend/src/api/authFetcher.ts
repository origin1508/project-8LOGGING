import customAxios from "@/util/customAxios";
import Storage from "@/storage/storage";
import { AuthFormInitialType } from "@/types/auth/authTypes";

export async function authRegisterRequest(
  endPoint: string,
  { email, nickname, password }: AuthFormInitialType
) {
  const res = await customAxios.post(
    endPoint,
    {
      email: email,
      nickname: nickname,
      password: password,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const { success } = res.data;
  return success;
}

export async function authLoginRequest(
  endPoint: string,
  { email, password }: AuthFormInitialType
) {
  const res = await customAxios.post(
    endPoint,
    {
      email: email,
      password: password,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const { datas } = res.data;
  Storage.setToken(datas.token);
  return datas;
}

export async function checkDuplicationRequest(
  endPoint: string,
  checkData: string
) {
  const res = await customAxios.get(endPoint + `/${checkData}`);
  return res.data.message;
}

export async function authProfileImageUpdate(
  endPoint: string,
  image: Blob
): Promise<string> {
  const formData = new FormData();
  formData.append("image", image);
  const res = await customAxios.put(endPoint, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${Storage.getToken()}`,
    },
  });
  const { datas } = res.data;
  return datas;
}

export async function getAuthInformationById(endPoint: string, id: string) {
  const res = await customAxios.get(`${endPoint}/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Storage.getToken()}`,
    },
  });
  const { datas } = res.data;
  return datas;
}

export async function authVerifyEmailCodeSend(email: string) {
  const res = await customAxios.post("/api/auth/email", {
    email: email,
  });
  return res.data;
}

export async function get(endpoint: string, params = "") {
  return customAxios.get(endpoint + "/" + params);
}
