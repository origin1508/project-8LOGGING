const { ChatRoom } = require("../models");

module.exports = {
  async addChatRoom(title, userId, max) {
    const room = await ChatRoom.create({ title, ownerId: userId, max });

    return room;
  },
};
