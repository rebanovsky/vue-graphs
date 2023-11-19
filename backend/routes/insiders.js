const express = require("express");
const Insiders= require("../controllers/insiders");

const router = express.Router();

router.route("/").get(Insiders.getAllInsiders);

module.exports = router;