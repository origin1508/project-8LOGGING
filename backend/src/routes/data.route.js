const express = require("express");
const router = express.Router();
const { dataCtrl } = require("../controllers");

router.get("/:dataName", dataCtrl.loadData);

module.exports = router;
