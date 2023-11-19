const express = require("express");
const earnings = require("../controllers/earnings");

const router = express.Router();

router.route("/").get(earnings.getAllEarnings);

module.exports = router;