const express = require("express");
const jwtVerification = require("../middlewares/jwtVerification");
const upload = require("../middlewares/upload");
const { channelCtrl } = require("../controllers");

const router = express.Router();

router.post("/", jwtVerification, upload.single("image"), channelCtrl.makeChannel); // 채널 생성
router.get("/", jwtVerification, channelCtrl.showChannelList); // 모집 중인 채널 목록 반환
router.get("/:channelId", jwtVerification, channelCtrl.showChannelInfo); // 채널 정보 확인
router.put("/:channelId", jwtVerification, upload.single("image"), channelCtrl.changeChannelInfo); // 채널 정보 변경
router.put("/:channelId/enter", jwtVerification, channelCtrl.requestChannelEnter); // 채널 입장 신청
router.delete("/:channelId/enter", jwtVerification, channelCtrl.cancelChannelEnter); // 채널 입장 신청 취소

module.exports = router