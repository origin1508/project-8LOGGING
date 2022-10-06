const express = require("express");
const jwtVerification = require("../middlewares/jwtVerification");
const { userCtrl } = require("../controllers");

const router = express.Router();

router.put("/nickname", jwtVerification, userCtrl.modifyNickname);
router.get("/password", jwtVerification, userCtrl.confirmPassword);
router.put("/password", jwtVerification, userCtrl.modifyPassword);

module.exports = router;