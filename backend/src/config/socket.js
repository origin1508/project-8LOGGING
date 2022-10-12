const socket = require("socket.io");

const socketConfig = (server) => {
  const io = SocketIO(server, { path: "/chat-socket" });

  io.on("connection", (socket) => {
    const req = socket.request;
    const clientIp =
      req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    console.log(ip, socket.id, req.ip);

    // 이벤트
    socket.on("enter", (data) => {
      console.log(data);
    });

    socket.on("disconnection", () => {
      console.log("연결 해제");
      clearInterval(socket.interval);
    });

    socket.interval = setInterval(() => {
      socket.emit();
    }, 5000);
  });
};

module.exports = socketConfig;
