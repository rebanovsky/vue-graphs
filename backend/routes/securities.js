const express = require("express");
const securityController = require("../controllers/securities");

const router = express.Router();

router.route("/").get(securityController.getAllSecurities);

module.exports = router;