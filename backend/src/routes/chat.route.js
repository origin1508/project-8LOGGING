const express = require("express");
const { chatCtrl } = require("../controllers");
const jwtVerification = require("../middlewares/jwtVerification");

const router = express.Router();

router.post("/room", jwtVerification, chatCtrl.createChatRoom);
router.get("/log/:roomId", jwtVerification, chatCtrl.showChatLog);
router.post("/log", jwtVerification, chatCtrl.createChatLog);
router.put("/log", jwtVerification, chatCtrl.modifyChatLog);
router.delete("/log", jwtVerification, chatCtrl.removeChatLog);

module.exports = router;
