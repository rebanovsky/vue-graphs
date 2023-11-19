const mongoose = require("mongoose");

const stockPriceSchema = new mongoose.Schema({
  v: Number,
  vw: Number,
  o: Number,
  c: Number,
  h: Number,
  l: Number,
  t: Date,
  n: Number,
});

const StockPrice = mongoose.model("stock_prices", stockPriceSchema);

module.exports = StockPrice;

