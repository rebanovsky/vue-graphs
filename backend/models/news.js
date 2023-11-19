const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
  uri: String,
  lang: String,
  isDuplicate: String,
  date: String,
  time: String,
  dateTime: Date,
  dateTimePub: Date,
  dataType: String,
  sim: String,
  url: String,
  title: String,
  body: String,
  source: Object,
  authors: Array,
  image: String,
  eventUri: String,
  sentiment: Number,
  wgt: Number,
  relevance: Number,
  sourceName: String,
});

const News = mongoose.model("news", newsSchema);

module.exports = News;
