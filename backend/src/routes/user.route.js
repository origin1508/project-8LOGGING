const express = require("express");
const jwtVerification = require("../middlewares/jwtVerification");
const upload = require("../middlewares/upload");
const { userCtrl } = require("../controllers");

const router = express.Router();

router.put("/nickname", jwtVerification, userCtrl.modifyNickname);
router.get("/password", jwtVerification, userCtrl.confirmPassword);
router.put("/password", jwtVerification, userCtrl.modifyPassword);
router.put("/profpic", jwtVerification, upload.single("image"), userCtrl.modifyProfPic);

module.exports = router;