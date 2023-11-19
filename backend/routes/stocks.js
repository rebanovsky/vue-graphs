const express = require("express");
const stockPriceController = require("../controllers/stocks");

const router = express.Router();

router.route("/").get(stockPriceController.getAllStockPrice);

module.exports = router;