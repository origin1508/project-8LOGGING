import { atom, selector } from "recoil";

export interface User {
  _id?: string;
  token?: string;
  email: string;
  nickname: string;
  password?: string;
  chnnels?: string[];
  description?: string;
  waitResList?: string[];
  waitReqList?: string[];
  following?: string[];
  profPic: any;
}

export const authState = atom({
  key: "authState",
  default: {
    id: "",
  },
});

export const curUserState = atom<User | null>({
  key: "cuUser",
  default: null,
});

export const isLoginState = selector({
  key: "isLogin",
  get: ({ get }) => {
    const curUser = get(curUserState);
    const checkLogin =
      sessionStorage.getItem("userToken") && curUser?.token ? true : false;
    return checkLogin;
  },
});
