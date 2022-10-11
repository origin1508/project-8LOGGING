const express = require("express");
const jwtVerification = require("../middlewares/jwtVerification");
const { followCtrl } = require("../controllers");


const router = express.Router();

router.get("/", jwtVerification, followCtrl.showFollowList);
router.post("/", jwtVerification, followCtrl.addFollow);
router.delete("/", jwtVerification, followCtrl.removeFollow);

module.exports = router;
