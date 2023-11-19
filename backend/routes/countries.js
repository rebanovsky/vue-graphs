const express = require("express");
const countriesController = require("../controllers/countries");

const router = express.Router();

router.route("/").get(countriesController.getAllCountries);
router.route("/:iso2").get(countriesController.validateIso2);

module.exports = router;