const express = require("express");
const jwtVerification = require("../middlewares/jwtVerification");

const router = express.Router();

const { authCtrl } = require("../controllers");

router.post("/login", authCtrl.login);
router.post("/register", authCtrl.register);
router.delete("/withdrawal", jwtVerification, authCtrl.withdrawUser);

module.exports = router;
