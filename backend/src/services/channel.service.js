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
  }
};
