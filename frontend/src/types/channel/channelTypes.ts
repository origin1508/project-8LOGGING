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
  title: string;
  ownerNickname: string;
  locationDist: string;
  locationCity: string;
  selectedCity: string;
  imgUrl: string;
  memberNum: number;
  curMemberNum: number;
}
