const mongoose = require("mongoose");

const securitySchema = new mongoose.Schema({
  symbol: String,
  name: String,
  cik: String,
  isin: String,
  cusip: String,
  exchange: String,
  exchangeShortName: String,
  industry: String,
  website: String,
  description: String,
  sector: String,
  country: Number,
});

const Security = mongoose.model("securities", securitySchema);

module.exports = Security;
