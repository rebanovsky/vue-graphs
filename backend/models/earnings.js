const mongoose = require("mongoose");

const earningsSchema = new mongoose.Schema({
  date: String,
  symbol: String,
  eps: Number,
  epsEstimated: Number,
  time: String,
  revenue: Number,
  revenueEstimated: String,
  fiscalDateEnding: String,
  updatedFromDate: String,
  mcap: Number,
  image: String,
});

const Earnings = mongoose.model("earnings", earningsSchema);

module.exports = Earnings;
