import customAxios from "@/util/customAxios";
import Storage from "@/storage/storage";
import { ChannelFormInitialType } from "@/types/channel/channelTypes";

export async function createChannelRequest(
  endPoint: string,
  {
    title,
    locationDist,
    selectedCity,
    memberNum,
    spec,
    image,
  }: ChannelFormInitialType
) {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("locationDist", locationDist);
  selectedCity && formData.append("locationCity", selectedCity);
  formData.append("memberNum", memberNum.toString());
  formData.append("spec", spec);
  formData.append("image", image as File);
  const res = await customAxios.post(endPoint, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${Storage.getToken()}`,
    },
  });
  return res.data;
}

export async function currentChannelListRequest(endPoint: string) {
  const res = await customAxios.get(endPoint, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Storage.getToken()}`,
    },
  });
  return res.data;
}

export async function currentChannelDetailRequest(endPoint: string) {
  const res = await customAxios.get(endPoint, {
    headers: {
      "Content-Type": "aplication/json",
      Authorization: `Bearer ${Storage.getToken()}`,
    },
  });
  return res.data;
}

export async function loginUserChannelListRequest(endPoint: string) {
  const res = await customAxios.get(endPoint, {
    headers: {
      "Content-Type": "aplication/json",
      Authorization: `Bearer ${Storage.getToken()}`,
    },
  });
  return res.data;
}

export async function channelEnterRequest(endPoint: string, message: string) {
  const res = await customAxios.put(
    endPoint,
    {
      message: message,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Storage.getToken()}`,
      },
    }
  );
  return res.data;
}

export async function channelMessageRequest(
  endPoint: string,
  roomId: string,
  message: string
) {
  const res = await customAxios.post(
    endPoint,
    {
      roomId: roomId,
      chat: message,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Storage.getToken()}`,
      },
    }
  );
  return res.data;
}

export async function channelChatLogRequest(endPoint: string) {
  const res = await customAxios.get(endPoint, {
    headers: {
      Authorization: `Bearer ${Storage.getToken()}`,
    },
  });
  return res.data;
}

export async function channelChatLogDeleteRequest(
  endPoint: string,
  roomId: string,
  chatId: string
) {
  const bodyData = JSON.stringify({
    roomId: roomId,
    chatId: chatId,
  });
  const res = await customAxios.delete(endPoint, {
    data: bodyData,
    headers: {
      Authorization: `Bearer ${Storage.getToken()}`,
    },
  });
  return res.data;
}

export async function channelChatLogUpdateRequest(
  endPoint: string,
  roomId: string,
  chatId: string,
  chat: string
) {
  const res = await customAxios.put(
    endPoint,
    {
      roomId: roomId,
      chatId: chatId,
      chat: chat,
    },
    {
      headers: {
        Authorization: `Bearer ${Storage.getToken()}`,
      },
    }
  );
  return res.data;
}
