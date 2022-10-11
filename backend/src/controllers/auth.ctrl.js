const { authService, emailService } = require("../services");

module.exports = {
  async login(req, res, next) {
    const { email, password } = req.body;
    try {
      const user = await authService.checkUser(email, password);
      const token = await authService.generateAccessToken(user.userId);

      const userData = {
        token,
        ...user,
      };
      
      res.status(201).json({
        success: true,
        status: 201,
        message: "login success",
        datas: userData,
      });
    } catch (err) {
      next(err);
    }
  },

  async register(req, res, next) {
    const { email, password, nickname } = req.body;
    try {
      const user = await authService.createUser(email, password, nickname);
      
      res.status(201).json({
        success: true,
        status: 201,
        message: "register success",
        datas: user,
      });
    } catch (err) {
      next(err);
    }
  },

  async sendEmailAuthCode(req, res, next) {
    const { email } = req.body;
    try {
      const authCode = await emailService.createAuthCode(email);
      const from = '"8LOGGING" <wnsdml0120@gmail.com>';
      const to = email;
      const subject = "8LOGGING 회원가입 이메일 인증 번호";
      const text = `인증번호는 ${authCode} 입니다.`;
      const html = `인증번호는 <b>${authCode}</b> 입니다.`;

      const emailSent = await emailService.sendEmail(from, to, subject, text, html);

      res.status(201).json({
        success: true,
        status: 201,
        message: "email authCode send success"
      })
    } catch (err) {
      next(err);
    }
  }

};
