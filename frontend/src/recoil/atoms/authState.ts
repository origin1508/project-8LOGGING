import { atom, selector } from "recoil";
import Storage from "@/storage/storage";
export interface IUser {
  _id?: string;
  token?: string;
  email?: string;
  nickname?: string;
  password?: string;
  chnnels?: string[];
  description?: string;
  waitResList?: string[];
  waitReqList?: string[];
  following?: string[];
  profPic?: any;
}

export const authState = atom({
  key: "authState",
  default: {
    userId: "",
  },
});
export const curUserIdState = atom({
  key: "curUserId",
  default: {
    userId: "",
  },
});
export const curUserState = atom<IUser | null>({
  key: "curUser",
  default: null,
});
