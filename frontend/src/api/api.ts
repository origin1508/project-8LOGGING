import axios from "axios";
import Storage from "@/storage/storage";

const serverUrl = process.env.REACT_APP_SERVER_BASE_URL;
interface ApiType {
  newNickname?: string;
  newDescription?: string;
  newPassword?: string;
  newProfPic?: string;
}

export async function put(endpoint: string, data: ApiType) {
  const bodyData = JSON.stringify(data);
  console.log("token", Storage.getToken());
  return axios.put(serverUrl + endpoint, bodyData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Storage.getToken()}`,
    },
  });
}

export async function get(endpoint: string, params = "") {
  return axios.get(serverUrl + endpoint + "/" + params, {
    headers: {
      Authorization: `Bearer ${Storage.getToken()}`,
    },
  });
}
