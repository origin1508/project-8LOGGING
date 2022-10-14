const { ChatRoom, ChatLog, User } = require("../models");
const ObjectId = require("mongoose").Types.ObjectId;
const dateToString = require("../utils/dateToString");

module.exports = {
  async addChatRoom(title, userId, max) {
    const room = await ChatRoom.create({ title, ownerId: userId, max });

    return room;
  },

  async addChatLog(roomId, userId, chat) {
    const log = await ChatLog.create({ roomId, userId, chat });

    return log;
  },

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

  async getUserChatLog(_id) {
    const logs = await ChatLog.aggregate([
      {
        $match: {
          _id: ObjectId(_id),
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
