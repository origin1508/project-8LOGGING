const express = require("express");
const jwtVerification = require("../middlewares/jwtVerification");
const { followCtrl } = require("../controllers");

const router = express.Router();

router.get("/list/:userId", jwtVerification, followCtrl.showFollowList);
router.get("/:targetId", jwtVerification, followCtrl.checkFollow);
router.post("/", jwtVerification, followCtrl.addFollow);
router.delete("/", jwtVerification, followCtrl.removeFollow);

module.exports = router;
