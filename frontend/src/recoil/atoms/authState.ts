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
    id: "",
  },
});

export const curUserState = atom<IUser>({
  key: "curUser",
  default: {},
});

export const isLoginState = selector({
  key: "isLogin",
  get: ({ get }) => {
    const curUser = get(curUserState);
    const checkLogin = Storage.getToken() && curUser?.token ? true : false;
    return checkLogin;
  },
});
