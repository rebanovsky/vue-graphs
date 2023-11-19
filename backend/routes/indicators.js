const express = require("express");
const Indicators = require("../controllers/indicators");

const router = express.Router();

router.route("/").get(Indicators.getAllEconIndicators);

module.exports = router;
