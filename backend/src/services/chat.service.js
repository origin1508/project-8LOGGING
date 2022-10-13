const { ChatRoom, ChatLog } = require("../models");

module.exports = {
  async addChatRoom(title, userId, max) {
    const room = await ChatRoom.create({ title, ownerId: userId, max });

    return room;
  },

  async addChatLog(roomId, userId, chat) {
    const log = await ChatLog.create({roomId, userId, chat});

    return log;
  }
};
