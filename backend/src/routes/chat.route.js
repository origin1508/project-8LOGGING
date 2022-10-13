const express = require("express");
const { chatCtrl } = require("../controllers");
const jwtVerification = require("../middlewares/jwtVerification");

const router = express.Router();

router.get("/room", (req, res, next) => {});

router.post("/room", jwtVerification, chatCtrl.createChatRoom);

module.exports = router;
