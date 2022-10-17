const express = require("express");
const { chatCtrl } = require("../controllers");
const jwtVerification = require("../middlewares/jwtVerification");

const router = express.Router();

router.post("/room", jwtVerification, chatCtrl.createChatRoom); // 채팅방 생성
router.get("/log/:roomId", jwtVerification, chatCtrl.showChatLog); // 모든 채팅 로그 조회
router.post("/log", jwtVerification, chatCtrl.createChatLog); // 채팅 로그 생성
router.put("/log", jwtVerification, chatCtrl.modifyChatLog); // 채팅 로그 수정
router.delete("/log", jwtVerification, chatCtrl.removeChatLog); // 채팅 로그 삭제

module.exports = router; 
