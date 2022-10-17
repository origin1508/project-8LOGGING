const socket = require("socket.io");
const { chatService } = require("../services");

const socketConfig = (server) => {
  const io = socket(server, { path: "/chat-socket" });
  const chat = io.of("/chat");

  chat.on("connection", (socket) => {
    console.log(`chat 연결 ${socket.id}`);
    

    socket.on("enter-chat", async (data) => {
      console.log(data.roomId + "에 접속");
      socket.roomId = data.roomId;
      const chatLog = await chatService.getChatLog(socket.roomId);
      console.log(chatLog);
      socket.join(socket.roomId);
      chat.to(socket.roomId).emit('receive-chatLog', chatLog);
      
    });

    socket.on("create-chat", async (data) => {
      const createdChat = await chatService.addChatLog(
        socket.roomId,
        data.userId,
        data.chat
      );
      const userChatInfo = await chatService.getUserChatLog(createdChat._id);

      socket.to(socket.roomId).emit("receive-create-chat", userChatInfo);
    }); // data = {userId, roomId, chat}

    socket.on("modify-chat", async (data) => {
      await chatService.updateChatLog(data.chatId, data.chat);
      const userChatInfo = await chatService.getUserChatLog(data.chatId);

      socket.to(socket.roomId).emit("receive-modify-chat", userChatInfo);
    }); // data = {chatId, roomId, chat}

    socket.on("remove-chat", async (data) => {
      const userChatInfo = await chatService.getUserChatLog(data.chatId);
      await chatService.deleteChatLog(data.chatId, socket.roomId);

      socket.to(socket.roomId).emit("receive-remove-chat", userChatInfo);
    }); // data = {chatId, roomId}

    socket.on("disconnect", () => {
      console.log(socket.id + "에서 연결 해제"); 
      socket.leave(socket.roomId);
    });
  });
};

module.exports = socketConfig;
