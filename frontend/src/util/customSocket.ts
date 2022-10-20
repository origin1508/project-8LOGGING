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
  console.log("chat 연결 성공", roomId);
  const res = customSocket.emit(eMsg, {
    roomId: roomId,
  });
  console.log("chat connect request res : ", res);
};

export const customSocketCreateRequest = (
  eMsg: string,
  userId: string,
  chat: string
) => {
  if (!customSocket) throw new Error("This is custom socket error");
  console.log("chat create request ", chat);
  const res = customSocket.emit(eMsg, {
    userId: userId,
    chat: chat,
  });
  console.log("chat create request emit ", res);
};

export const customSocketUpdateRequest = (
  eMsg: string,
  chatId: string,
  chat: string
) => {
  if (!customSocket) throw new Error("This is custom socket error");
  customSocket.emit(eMsg, {
    chatId: chatId,
    chat: chat,
  });
};

export const customSocketDeleteRequest = (eMsg: string, chatId: string) => {
  if (!customSocket) throw new Error("This is custom socket error");
  customSocket.emit(eMsg, {
    chatId: chatId,
  });
};

export const customSocketLeaveRequest = (eMsg: string, userId: string) => {
  if (!customSocket) throw new Error("This is custom socket error");
  customSocket.emit(eMsg, {
    userId: userId,
  });
};
