const mongoose = require("mongoose");

const tenqSchema = new mongoose.Schema({
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
  qtr: String
});

const Tenq = mongoose.model("tenqs", tenqSchema);

module.exports = Tenq;