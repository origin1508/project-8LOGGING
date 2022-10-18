const { ChatLog } = require("../models");
const ObjectId = require("mongoose").Types.ObjectId;
const dateToString = require("../utils/dateToString");

module.exports = {
  /**
   * 채팅 내역 불러오기
   * 
   * @param {String} roomId 소켓 room 아이디
   * @returns 채팅 내역
   */
  async getChatLog(roomId) {
    console.log(roomId);
    const logs = await ChatLog.aggregate([
      {
        $match: {
          roomId: ObjectId(roomId),
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userInfo",
        },
      },
      { $unwind: "$userInfo" },
      {
        $project: {
          roomId: 1,
          chat: 1,
          userId: 1,
          createdAt: 1,
          userInfo: {
            nickname: 1,
            profPic: 1,
          },
        },
      },
    ]);

    const resultLog = logs.map((log) => {
      log.createdAt = dateToString(log.createdAt);
      return log;
    });

    return resultLog;
  },
};
