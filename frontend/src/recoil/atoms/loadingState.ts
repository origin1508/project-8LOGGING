import { atom } from "recoil";

export const loadingState = atom<boolean>({
  key: "isLoadingState",
  default: false,
});
