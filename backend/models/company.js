const mongoose = require("mongoose");

const companiesSchema = new mongoose.Schema({
  symbol: String,
  name: String,
  exchange: String,
  exchangeShortName: String,
  industry: String,
  website: String,
  description: String,
  CEO: String,
  sector: String,
  image: String,
});

const Company = mongoose.model("companies", companiesSchema);

module.exports = Company;
