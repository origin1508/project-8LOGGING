const bcrypt = require("bcrypt");
const ApiError = require("../utils/ApiError");

// 모델 불러오기
const { User, Channel } = require("../models");

module.exports = {

  async checkEmailDuplication(email) {
    const exUser = await User.findOne({email});
    console.log(exUser);
    console.log(email)
    if(exUser) {
      throw ApiError.badRequest('이미 존재하는 이메일입니다.');
    }
  },

  async checkNicknameDuplication(nickname) {
    const exUser = await User.findOne({nickname});
    if(exUser) {
      throw ApiError.badRequest('이미 존재하는 닉네임입니다.');
    }
  },

  /**
   * 유저 닉네임 수정
   *
   * @param {String} userId
   * @param {String} newNickname
   * @returns
   */
  async updateUserNickname(userId, newNickname) {

    const user = await User.findByIdAndUpdate(
      userId,
      { nickname: newNickname },
      {
        new: true,
      }
    );

    return {
      nickname: user.nickname,
    };
  },

  /**
   * 기존 비밀번호와 확인 비밀번호 일치 확인
   *
   * @param {String} userId
   * @param {String} confirmationPassword
   * @returns
   */
  async confirmUserPassword(userId, confirmationPassword) {
    const user = await User.findOne({ _id: userId });

    // 비밀번호 비교
    const isCorrectPassword = await bcrypt.compare(
      confirmationPassword,
      user.password
    );
    if (!isCorrectPassword) {
      throw ApiError.badRequest("비밀번호가 일치하지 않습니다.");
    }

    return isCorrectPassword;
  },

  /**
   * 유저 비밀번호 수정
   *
   * @param {String} userId
   * @param {String} newPassword
   * @returns
   */
  async updateUserPassword(userId, newPassword) {
    // 기존 비밀번호와 새로운 비밀번호가 같은지 비교
    const user = await User.findOne({ _id: userId });
    const isSamePassword = await bcrypt.compare(newPassword, user.password);

    if (isSamePassword) {
      throw ApiError.badRequest("기존 비밀번호와 같은 비밀번호 입니다.");
    }

    // 비밀번호 암호화
    const modifiedPassword = await bcrypt.hash(newPassword, 12);

    const result = await User.findByIdAndUpdate(
      userId,
      { password: modifiedPassword },
      { new: true }
    );

    return result;
  },

  /**
   * 유저 프로필 사진 URL 수정
   *
   * @param {String} userId
   * @param {String} location
   * @returns
   */
  async updateUserProfPic(userId, location) {
    const result = await User.findByIdAndUpdate(userId, { profPic: location });
    return result;
  },

  /**
   * 유저 팔로잉 리스트 조회
   *
   * @param {String} userId
   * @returns
   */
  async findFollowingList(userId) {
    const user = await User.findOne({ _id: userId });

    return {
      following: user.following,
    };
  },
  /**
   * 자기소개 수정
   *
   * @param {String} userId
   * @param {String} newDescription
   * @returns
   */
  async updateUserDescription(userId, newDescription) {
    const user = await User.findByIdAndUpdate(
      userId,
      {
        description: newDescription,
      },
      { new: true }
    );

    return {
      description: user.description,
    };
  },

  /**
   * 유저 모든 데이터 조회
   *
   * @param {String} userId
   * @returns
   */
  async findUserAllData(userId) {
    const user = await User.findOne({ _id: userId }).lean();
    delete user.password;

    return user;
  },

  /**
   * 유저가 참여했던(활동이 끝난) 채널 정보 조회
   * 
   * @param {String} userId 
   * @returns 
   */
  async findChannelHistory(userId) {
    const channelsOfUser = await User.findById(userId, "channels");
    const channelsIds = channelsOfUser.channels;

    // 채널 아이디에 대응하는 채널 정보 가져오기, 활동 죵료된 채널(status == 2)
    const channels = await Promise.all(
      channelsIds.map((channelId) => {
        return Channel.findOne({ _id: channelId, status: 2 });
      })
    );

    // 채널 정보 배열에서 null 값 제거
    const results = channels.filter((channel) => channel != null);

    return results;
  },
};
