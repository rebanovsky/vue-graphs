const express = require("express");
const tenqController = require("../controllers/tenqs");

const router = express.Router();

router.route("/").get(tenqController.getAllTenqs);

module.exports = router;