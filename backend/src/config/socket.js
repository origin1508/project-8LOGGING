const socket = require("socket.io");
const { chatService } = require("../services");

const socketConfig = (server, app) => {
  const io = socket(server, { path: "/chat-socket" });
  app.set("chatIO", io);
  const chat = io.of("/chat");

  chat.on("connection", (socket) => {
    console.log("chat 연결");

    socket.on("enter", (data) => {
      console.log(data.roomId + "에 접속");
      socket.join(data.roomId);
    });

    socket.on("create-chat", async (data) => {
      console.log(data);

      const createdChat = await chatService.addChatLog(data.roomId, data.userId, data.chat);
      const userChatInfo = await chatService.getUserChatLog(createdChat._id);

      console.log(userChatInfo);

      socket.emit("chat", userChatInfo);
    });

    socket.on("disconnect", (data) => {
      console.log(data.roomId + "에서 연결 해제");
      socket.leave(data.roomId);
    });
  });
};

module.exports = socketConfig;
