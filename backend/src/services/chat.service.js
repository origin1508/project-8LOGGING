const { ChatRoom, ChatLog, User } = require("../models");
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
    
    const chatLogs = logs.map(log => {
      log.createdAt = dateToString(log.createdAt);
      return log;
    })

    const userInfo = await Promise.all(logs.map(log => {
      return User.findById(log.userId, "nickname profPic");
    }));

    console.log(userInfo);

    return {chatLogs, userInfo};
  },
};
