const mongoose = require("mongoose");

const eightkSchema = new mongoose.Schema({
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
  items: Array,
  periodOfReport: Date,
});

const EightKs = mongoose.model("eightks", eightkSchema);

module.exports = EightKs;
