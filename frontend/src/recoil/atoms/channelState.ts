import { atom } from "recoil";
// import { recoilPersist } from "recoil-persist";

interface ChannelsType {
  _id: string;
  title: string;
}

export const sidebarChannelsState = atom<ChannelsType[]>({
  key: "sidebarChannels",
  default: [
    {
      _id: "",
      title: "",
    },
  ],
});
