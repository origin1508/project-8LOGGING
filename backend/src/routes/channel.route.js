const express = require("express");
const jwtVerification = require("../middlewares/jwtVerification");
const upload = require("../middlewares/upload");
const { channelCtrl } = require("../controllers");

const router = express.Router();

router.post("/", jwtVerification, upload.single("image"), channelCtrl.makeChannel); // 채널 생성
router.get("/", jwtVerification, channelCtrl.showRecruitChannels); // 모집 중인 채널 목록 반환
router.get("/:channelId", jwtVerification, channelCtrl.showChannelInfo); // 채널 정보 확인
router.put("/:channelId/status", jwtVerification, channelCtrl.changeChannelStatus); // 채널 상태 변경

module.exports = router