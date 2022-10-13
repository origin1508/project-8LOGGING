const { ChatRoom, ChatLog } = require("../models");
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
    const logs = await ChatLog.find(
      { roomId },
      "_id roomId chat userId createdAt"
    ).lean();

    return logs.map((log) => {
      log.createdAt = dateToString(log.createdAt);
      return log;
    });
  },
};
