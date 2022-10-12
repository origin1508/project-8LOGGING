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

export interface ChannelDetailType {
  _id?: string;
  title: string;
  spec: string;
  imgUrl: string;
  locationCity: string;
  locationDist: string;
  memberNum: number;
  ownerInfo: {
    ownerId: string;
    ownerNickname: string;
    ownerPic: string;
  };
  membersInfo: Array<ChannelMemberType>;
}

export interface ChannelMemberType {
  memberId: string;
  memberNickname: string;
  memberPic: string;
}
