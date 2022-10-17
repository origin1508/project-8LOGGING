const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const ApiError = require("../utils/ApiError");

const { User, EmailAuth, Channel } = require("../models");

module.exports = {
  /**
   * 유저 데이터 생성
   * @param {String} email
   * @param {String} password
   * @param {String} nickname
   * @returns
   */
  async createUser(email, password, nickname) {
    // 중복된 이메일 확인
    const exUserEmail = await User.findOne({ email });
    if (exUserEmail) {
      throw ApiError.badRequest("중복된 이메일이 존재합니다.");
    }

    // 중복된 닉네임 확인
    const exUserNickname = await User.findOne({ nickname });
    if (exUserNickname) {
      throw ApiError.badRequest("중복된 닉네임이 존재합니다.");
    }

    // 이메일 인증 여부 확인
    const emailAuth = await EmailAuth.findOne({ email });
    if (emailAuth) {
      throw ApiError.badRequest("이메일 인증이 완료되지 않았습니다.")
    }

    // 비밀번호 암호화
    const encryptedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      email,
      password: encryptedPassword,
      nickname,
    });

    return user;
  },

  /**
   * 로그인 시 일치 불일치 체크
   *
   * @param {String} email
   * @param {String} password
   * @returns
   */
  async checkUser(email, password) {
    // 가입된 이메일인지 확인
    const user = await User.findOne({ email });
    if (!user) {
      throw ApiError.badRequest("가입되지 않은 이메일입니다.");
    }

    // 비밀번호가 일치하는지 확인
    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword) {
      throw ApiError.badRequest("비밀번호가 일치하지 않습니다.");
    }

    // 채널 정보 포함시켜주기
    const channels = await Promise.all(user.channels.map(async (channelId) => {
      const channel = await Channel.findById(channelId);
      return (({ _id, title, img })=>({ _id, title, img }))(channel)
    }))

    return {
      userId: user._id,
      email: user.email,
      nickname: user.nickname,
      channels
    };
  },

  /**
   * JWT 토큰 생성
   *
   * @param {String} userId
   * @returns {String}
   */
  async generateAccessToken(userId) {
    const token = jwt.sign(
      { userId },
      process.env.JWT_SECRET_KEY || "q23gh3214fg",
      {
        expiresIn: "7d",
        issuer: "HHS",
      }
    );

    return token;
  },

  async lockUserInfo(userId) {
    await User.findOneAndUpdate({_id: userId}, {withdrawal: true});
  },

  

};
