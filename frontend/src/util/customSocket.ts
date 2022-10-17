import socketIOClient from "socket.io-client";

export const customSocket = socketIOClient(
  `${process.env.REACT_APP_SERVER_BASE_URL}/chat`,
  {
    path: "/chat-socket",
    transports: ["websocket"],
  }
);

export const customSocketConnectRequest = (eMsg: string, roomId: string) => {
  if (!customSocket) throw new Error("This is custom socket error");
  customSocket.emit(eMsg, {
    roomId: roomId,
  });
};
