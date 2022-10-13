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
      const createdChat = await chatService.addChatLog(roomId, userId, chat);

      req.app.get('chatIO').of('/chat').to(roomId).emit('chat', createdChat);
      console.log(req.app.get('chatIO'));

      res.status(201).json({
        success: true,
        status: 201,
        message: "success creating new chat log",
        datas: createdChat,
      });
    } catch (err) {
      next(err);
    }
  },
};
