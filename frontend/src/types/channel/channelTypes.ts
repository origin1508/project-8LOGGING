export interface ChannelFormInitialType {
  title: string;
  locationDist: string;
  locationCity: string;
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
  imgUrl: string;
  memberNum: number;
  curMemberNum: number;
}
