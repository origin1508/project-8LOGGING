import axios from "axios";
import Storage from "@/storage/storage";
import { ChannelFormInitialType } from "@/types/channel/channelTypes";

const baseUrl = process.env.REACT_APP_SERVER_BASE_URL;

const multiFormhHeaders = {
  "Content-Type": "multipart/form-data",
  Authorization: `Bearer ${Storage.getToken()}`,
};

export async function createChannelRequest(
  endPoint: string,
  {
    title,
    locationDist,
    locationCity,
    memberNum,
    spec,
    image,
  }: ChannelFormInitialType
) {
  try {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("locationDist", locationDist);
    formData.append("locationCity", locationCity);
    formData.append("memberNum", memberNum.toString());
    formData.append("spec", spec);
    formData.append("image", image as File);
    const res = await axios.post(baseUrl + endPoint, formData, {
      headers: multiFormhHeaders,
    });
    return res.data;
  } catch (e) {
    throw new Error("Request error");
  }
}
