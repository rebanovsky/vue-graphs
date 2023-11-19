const express = require("express");
const tenkController = require("../controllers/tenks");

const router = express.Router();

router.route("/").get(tenkController.getAllTenks);

module.exports = router;