const express = require("express");
const jwtVerification = require("../middlewares/jwtVerification");
const upload = require("../middlewares/upload");
const { userCtrl } = require("../controllers");

const router = express.Router();

router.put("/nickname", jwtVerification, userCtrl.modifyNickname); // 닉네임 변경
router.get("/password", jwtVerification, userCtrl.confirmPassword); // 비밀번호 확인
router.put("/password", jwtVerification, userCtrl.modifyPassword); // 비밀번호 변경
router.put("/profpic", jwtVerification, upload.single("image"), userCtrl.modifyProfPic); // 유저 프로필 사진 변경
router.get('/following', jwtVerification, userCtrl.getFollowingList); // 팔로윙 리스트 조회
router.put("/description", jwtVerification, userCtrl.modifyDescription); // 자기소개 수정
router.get('/userinfo/:userId', jwtVerification, userCtrl.getUserAllData); // 유저 모든 데이터 조회
router.get('/channelhistory', jwtVerification, userCtrl.getChannelHistory); // 유저가 참여했던 채널 조회

module.exports = router;