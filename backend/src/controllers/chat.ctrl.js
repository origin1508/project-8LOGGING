const { chatService } = require("../services");

module.exports = {
  async createChatRoom(req, res, next) {
    const userId = req.userId;
    const { title, max } = req.body;

    try {
      const createdRoom = await chatService.addChatRoom(title, userId, max);

      res.status(201).json({
        success: true,
        status: 201,
        message: "success creating new Chat Room",
        datas: createdRoom,
      });
    } catch (err) {
      next(err);
    }
  },

  async createChatLog(req, res, next) {
    const userId = req.userId;
    const { roomId, chat } = req.body;

    try {
      const createdLog = await chatService.addChatLog(roomId, userId, chat);

      res.status(201).json({
        success: true,
        status: 201,
        message: "success creating new chat log",
        datas: createdLog,
      });
    } catch (err) {
      next(err);
    }
  },
};
