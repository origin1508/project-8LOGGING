import axios from "axios";
import Storage from "@/storage/storage";
import customAxios from "@/util/customAxios";

const serverUrl = process.env.REACT_APP_SERVER_BASE_URL;
interface dataType {
  newNickname?: string;
  newDescription?: string;
  newPassword?: string;
  newProfPic?: string;
  currentPassword?: string;
  targetId?: string;
}

export async function put(endpoint: string, data: dataType) {
  const bodyData = JSON.stringify(data);

  return axios.put(serverUrl + endpoint, bodyData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Storage.getToken()}`,
    },
  });
}

// export async function userProfileUpdate(endpoint: string, data: dataType) {
//   const bodyData = JSON.stringify(data);
//   const res = axios.put(endpoint, bodyData, {
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${Storage.getToken()}`,
//     },
//   });
//   const { datas } = (await res).data;
//   return datas;
// }

export async function get(endpoint: string, params = "") {
  return axios.get(serverUrl + endpoint + "/" + params, {
    headers: {
      Authorization: `Bearer ${Storage.getToken()}`,
    },
  });
}

export async function post(endpoint: string, data: dataType) {
  const bodyData = JSON.stringify(data);
  return axios.post(serverUrl + endpoint, bodyData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Storage.getToken()}`,
    },
  });
}

export async function del(endpoint: string, data: dataType) {
  const bodyData = JSON.stringify(data);
  return axios.delete(serverUrl + endpoint, {
    data: bodyData,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Storage.getToken()}`,
    },
  });
}
