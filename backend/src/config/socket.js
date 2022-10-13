const socket = require("socket.io");

const socketConfig = (server) => {
  const io = socket(server, { path: "/chat-socket" });

  io.on("connection", (socket) => {
    const req = socket.request;
    // const clientIp =
    //   req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    
    // 이벤트
    socket.on("enter-room", (nickname) => {
      console.log(nickname + '님 이 접속하셨습니다.');
    });

    socket.on("disconnection", () => {
      console.log("연결 해제");
      clearInterval(socket.interval);
    });

    socket.on('test', (data) => {
      console.log(data); 
    })

    socket.interval = setInterval(() => {
      socket.emit('checkConnection', '5초마다 연결 확인');
    }, 5000);
  });
};

module.exports = socketConfig;
