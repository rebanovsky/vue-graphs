const mongoose = require("mongoose");

const countriesSchema = new mongoose.Schema({
  name: String,
  iso2: String,
  iso3: String,
  countryCode: String,
  region: String,
  subRegion: String,
});

const Country = mongoose.model("countries", countriesSchema);

module.exports = Country;
