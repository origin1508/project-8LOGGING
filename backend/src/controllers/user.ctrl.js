const ApiError = require("../utils/ApiError");
const { userService } = require("../services");

module.exports = {
  // 유저 닉네임 수정
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

  // 현재 비밀번호와 입려한 비밀번호 비교
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

  // 유저 비밀번호 수정
  async modifyPassword(req, res, next) {
    const userId = req.userId;
    const { newPassword } = req.body;

    try {
      const user = await userService.updateUserPassword(userId, newPassword);

      res.status(201).json({
        success: true,
        status: 201,
        message: "Password modification success",
      });
    } catch (err) {
      next(err);
    }
  },

  // 유저 프로필 사진 변경
  async modifyProfPic(req, res, next) {
    const userId = req.userId;
    const { location } = req.file;
    try {
      const user = await userService.updateUserProfPic(userId, location);

      res.status(201).json({
        success: true,
        message: "Profile picture modification success",
        datas: {
          profileUrl: location,
        },
      });
    } catch (err) {
      next(err);
    }
  },

  // 유저의 친구 목록 조회
  async getFollowingList(req, res, next) {
    const userId = req.userId;

    try {
      const followingList = await userService.findFollowingList(userId);

      res.status(200).json({
        success: true,
        status: 200,
        message: "success getting following list",
        datas: followingList,
      });
    } catch (err) {
      next(err);
    }
  },

  // 유저 자기소개 수정
  async modifyDescription(req, res, next) {
    const userId = req.userId;
    const { newDescription } = req.body;

    try {
      const description = await userService.updateUserDescription(
        userId,
        newDescription
      );

      res.status(201).json({
        success: true,
        status: 201,
        message: "description modification success",
        datas: description,
      });
    } catch (err) {
      next(err);
    }
  },

  // 유저의 모든 데이터 조회
  async getUserAllData(req, res, next) {
    const userId = req.userId;

    try {
      const user = await userService.findUserAllData(userId);

      res.status(200).json({
        success: true,
        status: 200,
        message: "success getting user all datas",
        datas: user,
      });
    } catch {
      next(err);
    }
  },

  async getChannelHistory(req, res, next) {
    const userId = req.userId;

    try {
      const history = await userService.findChannelHistory(userId);

      res.status(200).json({
        success: true,
        status: 200,
        message: "Get channel history success",
        datas: history,
      });
    } catch (err) {
      next(err);
    }
  },
};
