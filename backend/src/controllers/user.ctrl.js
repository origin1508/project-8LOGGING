const ApiError = require("../utils/ApiError");
const { userService } = require("../services");

module.exports = {
  async modifyNickname(req, res, next) {
    const userId = req.userId;
    const { newNickname } = req.body;
    try {
      const user = await userService.updateUserNickname(userId, newNickname);

      res.status(201).json({
        success: true,
        status: 201,
        message: "nickname modification success.",
        datas: user,
      });
    } catch (err) {
      next(err);
    }
  },

  async confirmPassword(req, res, next) {
    const userId = req.userId;
    const { confirmationPassword } = req.body;

    try {
      const isCorrectPassword = await userService.confirmUserPassword(
        userId,
        confirmationPassword
      );

      res.status(200).json({
        success: true,
        status: 200,
        message: "Verification completed.",
      });
    } catch (err) {
      next(err);
    }
  },

  async modifyPassword(req, res, next) {
    const userId = req.userId;
    const { newPassword } = req.body;

    try {
      const user = await userService.updateUserPassword(userId, newPassword);

      res.status(201).json({
        success: true,
        status: 201,
        message: "Password modification success",
      })
    } catch (err) {
      next(err);
    }
  },

  async modifyProfPic(req, res, next) {
    const userId = req.userId;
    const { location } = req.file;
    try {
      const user = await userService.updateUserProfPic(userId, location);

      res.status(201).json({
        success: true,
        status: 201,
        message: "profile picture modification success.",
        datas: user,
      });
    } catch (err) {
      next(err);
    }
  },
};
