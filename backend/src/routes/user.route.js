const express = require("express");
const jwtVerification = require("../middlewares/jwtVerification");
const upload = require("../middlewares/upload");
const { userCtrl } = require("../controllers");

const router = express.Router();

router.put("/nickname", jwtVerification, userCtrl.modifyNickname); // 닉네임 변경
router.get("/password", jwtVerification, userCtrl.confirmPassword); // 비밀번호 확인
router.put("/password", jwtVerification, userCtrl.modifyPassword); // 비밀번호 변경
router.put("/profpic", jwtVerification, upload.single("image"), userCtrl.modifyProfPic); // 유저 프로필 사진 변경
router.get('/following', jwtVerification, userCtrl.getFollowingList);

module.exports = router;