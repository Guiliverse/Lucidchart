const express = require("express");
const router = express.Router();
const Controller = require("../controllers/Controller");

router.post("/add", Controller.addChart);
router.post("/user", Controller.addUser);
router.get("/getCount", Controller.getCount);
router.get("/getChart", Controller.getChart);

module.exports = router;
