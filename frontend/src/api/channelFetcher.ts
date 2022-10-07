import axios from "axios";
import { ChannelFormInitialType } from "@/types/channel/channelTypes";

const baseUrl = process.env.REACT_APP_SERVER_BASE_URL;

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer `,
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
  const res = await axios.post(
    baseUrl + endPoint,
    {
      title: title,
      locationDist: locationDist,
      locationCity: locationCity,
      memberNum: memberNum,
      spec: spec,
      image: image,
    },
    { headers: headers }
  );
}
