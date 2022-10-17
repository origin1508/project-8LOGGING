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
      const userChatInfo = await chatService.getUserChatLog(createdChat._id);

      req.app
        .get("chatIO")
        .of("/create-chat")
        .to(roomId)
        .emit("create-chat", userChatInfo);

      res.status(201).json({
        success: true,
        status: 201,
        message: "success creating new chat log",
        datas: userChatInfo,
      });
    } catch (err) {
      next(err);
    }
  },

  async modifyChatLog(req, res, next) {
    const { chatId, chat, roomId } = req.body;

    try {
      await chatService.updateChatLog(chatId, chat);

      const userChatInfo = await chatService.getUserChatLog(chatId);

      req.app
        .get("chatIO")
        .of("/modify-chat")
        .to(roomId)
        .emit("modify-chat", userChatInfo);

      res.status(201).json({
        success: true,
        status: 201,
        message: "success modifying chat",
        datas: userChatInfo,
      });
    } catch (err) {
      next(err);
    }
  },

  async removeChatLog(req, res, next) {
    const { chatId, roomId } = req.body;
    try {
      const userChatInfo = await chatService.getUserChatLog(chatId);

      await chatService.deleteChatLog(chatId, roomId);

      req.app
        .get("chatIO")
        .of("/chat")
        .to(roomId)
        .emit("remove-chat", userChatInfo);

      res.status(201).json({
        success: true,
        status: 201,
        message: "success removing chat",
        datas: userChatInfo,
      });
    } catch (err) {
      next(err);
    }
  },

  async showChatLog(req, res, next) {
    const { roomId } = req.params;

    try {
      const chatLog = await chatService.getChatLog(roomId);

      res.status(200).json({
        success: true,
        status: 200,
        message: "success loading chat logs",
        datas: chatLog,
      });
    } catch (err) {
      next(err);
    }
  },
};
