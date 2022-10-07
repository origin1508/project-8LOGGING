const bcrypt = require("bcrypt");
const ApiError = require("../utils/ApiError");

// 모델 불러오기
const { User } = require("../models");

module.exports = {
  /**
   * 유저 닉네임 수정
   *
   * @param {String} userId
   * @param {String} newNickname
   * @returns
   */
  async updateUserNickname(userId, newNickname) {
    // 중복된 닉네임 체크
    const exUser = await User.findOne({ nickname: newNickname });
    if (exUser) {
      throw ApiError.badRequest("이미 존재하는 닉네임 입니다.");
    }

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
};
