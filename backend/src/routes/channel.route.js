const express = require("express");
const jwtVerification = require("../middlewares/jwtVerification");
const upload = require("../middlewares/upload");
const { channelCtrl } = require("../controllers");

const router = express.Router();

router.post("/", jwtVerification, upload.single("image"), channelCtrl.makeChannel); // 채널 생성

module.exports = router