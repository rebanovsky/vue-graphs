const mongoose = require("mongoose");

const econIndicatorSchema = new mongoose.Schema({
  dateString: String,
  date: String,
  country: String,
  event: String,
  currency: String,
  previous: Number,
  estimate: Number,
  actual: Number,
  change: Number,
  impact: String,
  changePercentage: Number,
  flag: String,
  time: String,
});

const EconIndicators = mongoose.model("econ_indicators", econIndicatorSchema);

module.exports = EconIndicators;
