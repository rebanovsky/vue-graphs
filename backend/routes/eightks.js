const express = require("express");
const eightks = require("../controllers/eightks");

const router = express.Router();

router.route("/").get(eightks.getAllEightks);

module.exports = router;