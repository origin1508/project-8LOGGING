const socket = require("socket.io");

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

    socket.on("disconnect", (data) => {
      console.log(data.roomId + "에서 연결 해제");
      socket.leave(data.roomId);
    });

  });
};

module.exports = socketConfig;
