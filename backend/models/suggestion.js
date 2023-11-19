const mongoose = require('mongoose');

const suggestionSchema = new mongoose.Schema({
    symbol: String,
    companyName: String,
    cik: String,
    isin: String,
    cusip: String,
    industry: String,
    sector: String,
    country: String,
    image: String,
  });

const Suggestion = mongoose.model("Suggestion", suggestionSchema);

module.exports = Suggestion;