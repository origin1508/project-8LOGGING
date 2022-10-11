const ApiError = require("../utils/ApiError");
const nodemailer = require("nodemailer");

// 모델 불러오기
const { EmailAuth } = require("../models");

module.exports = {
  /**
   * 이메일 전송
   * 
   * @param {String} from 
   * @param {String} to 
   * @param {String} subject 
   * @param {String} text 
   * @param {String} html 
   * @returns 
   */
  async sendEmail(from, to, subject, text, html) {
    /* < Input 예시 >
        from: '"Fred Foo 👻" <wnsdml0120@gmail.com>'
        to: "wnsdml0120@gmail.com"
        subject: "Hello ✔"
        text: "Hello world?"
        html: "<b>Hello world?</b>"
    */
    try {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: process.env.MAILS_EMAIL, // Google ID
          pass: process.env.MAILS_PWD, // Google App Password
        },
      });
      return transporter.sendMail({ from, to, subject, text, html });
    } catch (error) {
      throw ApiError.badRequest("이메일 전송 요청 실패하였습니다.")
    }
  },

  /**
   * 이메일 인증 번호 생성
   * 
   * @param {String} email 
   * @returns 
   */
  async createAuthCode(email) {
    // 인증 번호 생성
    const authCode = Math.random().toString(36).slice(-8);

    try {
      const isExist = await EmailAuth.findOne({ email });
      // 기존 인증 번호 존재 시 갱신
      if (isExist) {
        await EmailAuth.findOneAndUpdate({ email }, { authCode });
      } else {
        await EmailAuth.create({ email, authCode });
      }
      return authCode
    } catch (error) {
      throw ApiError.badRequest("인증 번호 생성 실패하였습니다.");
    }
  },

  /**
   * 이메일 인증 번호 확인
   * 
   * @param {String} email 
   * @param {String} authCode 
   */
  async checkAuthCode(email, authCode) {
    try {
      const emailAuth = await EmailAuth.findOne({ email });
      if (emailAuth.authCode == authCode) {
        await EmailAuth.findOneAndDelete({ email });
        return true
      } else {
        return false
      }
    } catch (error) {
      throw ApiError.badRequest("이메일 인증 번호 확인 실패했습니다.")
    }
  }



};
