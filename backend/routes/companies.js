const express = require("express");
const companiesController = require("../controllers/companies");

const router = express.Router();

router.route("/").get(companiesController.getAllCompanies);

module.exports = router;