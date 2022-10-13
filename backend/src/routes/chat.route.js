const express = require("express");
const { chatCtrl } = require("../controllers");
const jwtVerification = require("../middlewares/jwtVerification");

const router = express.Router();

router.post("/room", jwtVerification, chatCtrl.createChatRoom);
router.get("/log/:roomId", jwtVerification, chatCtrl.showChatLog);
router.post("/log", jwtVerification, chatCtrl.createChatLog);

module.exports = router;
