const express = require("express");

const router = express.Router();

const { authCtrl } = require("../controllers");

router.post("/login", authCtrl.login);
router.post("/register", authCtrl.register);
router.post("/email", authCtrl.sendEmailAuthCode);

module.exports = router;
