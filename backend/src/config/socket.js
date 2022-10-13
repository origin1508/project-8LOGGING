const socket = require("socket.io");

const socketConfig = (server, app) => {
  const io = socket(server, { path: "/chat-socket" });
  app.set('chatIO', io);
  const room = io.of('/room');
  const chat = io.of('/chat');

  room.on('connection', (socket) => {
    console.log('room 연결');
    
  });

  chat.on('connection', (socket) => {
    console.log('chat 연결');
  })
  
};

module.exports = socketConfig;