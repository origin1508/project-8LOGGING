import customAxios from "@/util/customAxios";
import Storage from "@/storage/storage";
import { ChannelFormInitialType } from "@/types/channel/channelTypes";

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
  const formData = new FormData();
  formData.append("title", title);
  formData.append("locationDist", locationDist);
  formData.append("locationCity", locationCity);
  formData.append("memberNum", memberNum.toString());
  formData.append("spec", spec);
  formData.append("image", image as File);
  const res = await customAxios.post(endPoint, formData, {
    headers: multiFormhHeaders,
  });
  return res.data;
}

export async function currentChannelListRequest(endPoint: string) {
  const res = await customAxios.get(endPoint);
  return res.data;
}
