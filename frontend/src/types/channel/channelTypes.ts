export interface ChannelFormInitialType {
  title: string;
  locationDist: string;
  selectedCity?: string;
  memberNum: number;
  spec: string;
  image?: string | Blob;
}

export interface ChannelsType {
  _id: string;
  ownerId: string;
  title: string;
  ownerNickname: string;
  locationDist: string;
  locationCity: string;
  selectedCity: string;
  img: string;
  memberNum: number;
  curMemberNum: number;
}

export interface ChannelOwnerType {
  _id?: string;
  email: string;
  nickname: string;
  description: string;
  profPic: string;
}
