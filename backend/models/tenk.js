const mongoose = require("mongoose");

const tenkSchema = new mongoose.Schema({
  accessionNo: Date,
  cik: String,
  ticker: String,
  companyName: String,
  formType: String,
  description: String,
  filedAt: Date,
  linkToTxt: String,
  linkToHtml: String,
  linkToXbrl: String,
  linkToFilingDetails: String,
  periodOfReport: Date,
  mcap: Number,
});

const Tenk = mongoose.model("tenks", tenkSchema);

module.exports = Tenk;
