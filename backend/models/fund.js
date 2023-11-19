const mongoose = require("mongoose");

const fundsSchema = new mongoose.Schema({
  cik: String,
  name: String,
  sectors: [
    {
      informationTechnology: Number,
      healthCare: Number,
      financials: Number,
      consumerDiscretionary: Number,
      industrials: Number,
      communicationServices: Number,
      consumerStaples: Number,
      energy: Number,
      utilities: Number,
      realEstate: Number,
      materials: Number,
    },
  ],
});

const Funds = mongoose.model("us_funds", fundsSchema);

module.exports = Funds;
