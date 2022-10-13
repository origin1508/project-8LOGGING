const bcrypt = require("bcrypt");
const ApiError = require("../utils/ApiError");

// 모델 불러오기
const { User, Channel, WaitList } = require("../models");

module.exports = {
  async checkEmailDuplication(email) {
    const exUser = await User.findOne({ email });
    if (exUser) {
      throw ApiError.badRequest("이미 존재하는 이메일입니다.");
    }
  },

  async checkNicknameDuplication(userId, nickname) {
    const exUser = await User.findOne({ nickname });
    
    if (exUser && exUser._id.toString() !== userId) {
      throw ApiError.badRequest("이미 존재하는 닉네임입니다.");
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
   * 기존 비밀번호와 currentPassword 비교
   * 
   * @param {String} userId
   * @param {String} currentPassword
   * @returns
   */
  async checkPasswordCoincidence(userId, currentPassword) {
    const user = await User.findById(userId);

    // 비밀번호 비교
    const isCorrectPassword = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (!isCorrectPassword) {
      throw ApiError.badRequest("비밀번호가 일치하지 않습니다.");
    }
  },

  /**
   * 기존 비밀번호와 newPassword 비교
   * 
   * @param {String} userId 
   * @param {String} newPassword 
   */
  async checkPasswordDuplication(userId, newPassword) {
    const user = await User.findById(userId);

    // 기존 비밀번호와 새로운 비밀번호가 같은 지 비교
    const isDuplicated = await bcrypt.compare(newPassword, user.password);

    if (isDuplicated) {
      throw ApiError.badRequest("기존의 비밀번호와 같은 비밀번호입니다.");
    }
  },

  /**
   * 유저 비밀번호 수정
   *
   * @param {String} userId
   * @param {String} newPassword
   * @returns
   */
  async updateUserPassword(userId, newPassword) {
    // 비밀번호 암호화
    const modifiedPassword = await bcrypt.hash(newPassword, 12);

    await User.findByIdAndUpdate(
      userId,
      { password: modifiedPassword },
      { new: true }
    );
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

  // /**
  //  * 유저 팔로잉 리스트 조회
  //  *
  //  * @param {String} userId
  //  * @returns
  //  */
  // async findFollowingList(userId) {
  //   const user = await User.findOne({ _id: userId });

  //   return {
  //     following: user.following,
  //   };
  // },
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
   * 유저 모든 데이터 조회 (소속 채널 상세 정보 포함)
   *
   * @param {String} userId
   * @returns
   */
  async findUserAllData(userId) {
    const user = await User.findOne({ _id: userId }).lean();
    const waitingChannels = await Promise.all(user.waitReqList.map(async (waitListId) => {
      const waitList = await WaitList.findById(waitListId);
      return waitList.channelId
    }))
    const channels = await Promise.all(user.channels.map(async (channelId) => {
      const channel = await Channel.findById(channelId);
      // 개설자/입장대기자/일반멤버 파악
      var position = 1;
      if ( userId == channel.ownerId )  {
        position = 0;
      } else if ( waitingChannels.includes(channelId) ) {
        position = 2;
      }

      return {
        _id: channel._id,
        title: channel.title,
        locationDist: channel.locationDist,
        locationCity: channel.locationCity,
        memberNum: channel.memberNum,
        curMemberNum: channel.members.length,
        img: channel.img,
        position
      }
    }))
    
    user.channels = channels
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

  async findLockedUser(email) {
    const exUser = await User.findOne({email}, "withdrawal").lean();
    if(exUser.withdrawal) {
      throw ApiError.forbbiden('탈퇴한 회원입니다.');
    }
  }
};
