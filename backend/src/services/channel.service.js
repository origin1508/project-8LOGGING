const ApiError = require("../utils/ApiError");

// 모델 불러오기
const { User, Channel, WaitList } = require("../models");

module.exports = {
  /**
   * 새로운 채널 생성
   * 
   * @param {String} title 
   * @param {String} userId 
   * @param {String} locationDist 
   * @param {String} locationCity 
   * @param {Number} memberNum 
   * @param {String} spec 
   * @param {String} location 
   * @returns 
   */
  async createChannel(title, userId, locationDist, locationCity, memberNum, spec, location) {
    // 중복된 제목 체크
    const exChannel = await Channel.findOne({ title });
    if (exChannel) {
      throw ApiError.badRequest("이미 존재하는 채널명입니다.");
    }

    // 채널 생성
    const channel = await Channel.create({
      title,
      ownerId: userId,
      locationDist,
      locationCity,
      memberNum,
      spec,
      img: location,
      members: [userId],
      status: 0
    });

    // WaitList 생성
    const waitList = await WaitList.create({ 
      channelId: channel._id,
      ownerId: userId
    })

    // 생성한 user의 channels, waitResList 정보 update
    const user = await User.findOne({ _id: userId })
    const updatedUser = await User.findByIdAndUpdate( userId, { 
        channels : [...user.channels, channel._id],
        waitResList: [...user.waitReqList, waitList._id]
      } 
    )

    return channel._id;
  },

  /**
   * 모집 중인 채널 목록 반환
   * 
   * @returns 
   */
  // async getRecruitChannels() {
  //   const channels = await Channel.find({status: 0});

  //   const recruitChannels = await Promise.all(channels.map( async (channel) => { 
  //     // ownerId에 해당되는 nickname 찾기용
  //     const user = await User.findById(channel.ownerId)

  //     return {
  //       _id: channel._id, 
  //       title: channel.title,
  //       imgUrl: channel.img,
  //       locationDist: channel.locationDist,
  //       locationCity: channel.locationCity,
  //       memberNum: channel.memberNum,
  //       curMemberNum: channel.members.length,
  //       ownerNickname: user.nickname
  //     }
  //   }));

  //   return recruitChannels
  // },

  async getRecruitChannels(page, perPage, status) {
    const channels = await Channel.find({status}).sort({_id: -1}).skip((page - 1) * perPage).limit(perPage);
    
    return channels;
  },

  /**
   * 채널 정보 확인
   * 
   * @param {String} channelId 
   */
  async getChannelInfo(channelId) {
    const channel = await Channel.findById(channelId);
    const owner = await User.findById(channel.ownerId);

    // 멤버들 정보 불어오기
    const membersInfo = await Promise.all(channel.members.map( async (memberId) => {
      const member = await User.findById(memberId);
      return {
        memberId,
        memberNickname: member.nickname,
        memberPic: member.profPic
      }
    }))

    // 채널 정보 모으기
    const channelInfo = {
      _id: channel._id,
      title: channel.title,
      ownerInfo: {
        ownerId: channel.ownerId,
        ownerNickname: owner.nickname,
        ownerPic: owner.profPic, 
      },
      locationDist: channel.locationDist, 
      locationCity: channel.locationCity,
      imgUrl: channel.img,
      spec: channel.spec,
      memberNum: channel.memberNum,
      membersInfo
    }

    return channelInfo
  },

  /**
   * 채널 상태 변경
   * 
   * @param {String} userId 
   * @param {String} channelId 
   * @param {Number} newStatus 
   * @returns 
   */
  async updateChannelInfo(userId, channelId, toUpdate) {
    // 채널 소유권 확인
    const channel = await Channel.findById(channelId);
    if (channel.ownerId!=userId) {
      throw ApiError.badRequest("채널의 수정 권한이 없습니다.");
    }    

    // 채널 정보 수정
    const { title, status, spec, locationDist, locationCity, img } = toUpdate;

    const newValues = {
        ...(title && { title }),
        ...(status && { status }),
        ...(spec && { spec }),
        ...(locationDist && { locationDist }),
        ...(locationCity && { locationCity }),
        ...(img && { img }),
    };

    const updatedChannel = await Channel.findByIdAndUpdate(channelId, newValues);

    return updatedChannel._id
  },
};
