const mongoose = require("mongoose");

const insiderSchema = new mongoose.Schema({
  symbol: String,
  filingDate: Date,
  transactionDate: String,
  reportingCik: String,
  transactionType: String,
  securitiesOwned: Number,
  companyCik: String,
  reportingName: String,
  typeOfOwner: String,
  formType: String,
  securitiesTransacted: Number,
  price: Number,
  securityName: String,
  link: String,
  volume: Number,
  companyName: String,
  buys: [
    {
      a: Number,
      b: Number,
      transaction: String,
    },
  ],
  sells: [
    {
      a: Number,
      b: Number,
      transaction: String,
    },
  ],
  portfolio: [
    {
      value: Number,
      label: String,
      color: String
    },
    {
      value: Number,
      label: String,
      color: String
    }
  ]
});


const Insider = mongoose.model("insiders", insiderSchema);

module.exports = Insider;
