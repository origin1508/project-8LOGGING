import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

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
  __v?: number;
}
export interface IUserId {
  CurUserId: string;
}

export const authState = atom({
  key: "authState",
  default: {
    userId: "123",
  },
});
const { persistAtom } = recoilPersist();
export const curUserIdState = atom<string>({
  key: "curUserId",
  default: "",
  effects_UNSTABLE: [persistAtom],
});
export const curUserState = atom<IUser | null>({
  key: "curUser",
  default: null,
});
