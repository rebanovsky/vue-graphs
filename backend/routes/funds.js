const express = require("express");
const fundsController = require("../controllers/funds");

const router = express.Router();

router.route("/").get(fundsController.getAllFunds);

module.exports = router;