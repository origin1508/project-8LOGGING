import { atom } from "recoil";
// import { recoilPersist } from "recoil-persist";

interface ChannelsType {
  _id: string;
  title: string;
}

export const channelsState = atom<Array<ChannelsType>>({
  key: "channels",
  default: [
    {
      _id: "",
      title: "",
    },
  ],
});
