const mongoose = require("mongoose");

const fundsFeedSchema = new mongoose.Schema({
  date: Date,
  cik: String,
  investorName: String,
  portfolioSize: Number,
  securitiesAdded: Number,
  securitiesRemoved: Number,
  marketValue: Number,
  previousMarketValue: Number,
  changeInMarketValue: Number,
  changeInMarketValuePercentage: Number,
  averageHoldingPeriod: Number,
  averageHoldingPeriodTop10: Number,
  averageHoldingPeriodTop20: Number,
  turnover: Number,
  turnoverAlternateSell: Number,
  turnoverAlternateBuy: Number,
  performance: Number,
  performancePercentage: Number,
  lastPerformance: Number,
  changeInPerformance: Number,
  performance1year: Number,
  performancePercentage1year: Number,
  performance3year: Number,
  performancePercentage3year: Number,
  performance5year: Number,
  performancePercentage5year: Number,
  performanceSinceInception: Number,
  performanceSinceInceptionPercentage: Number,
  performanceRelativeToSP500Percentage: Number,
  performance1yearRelativeToSP500Percentage: Number,
  performance3yearRelativeToSP500Percentage: Number,
  performance5yearRelativeToSP500Percentage: Number,
  performanceSinceInceptionRelativeToSP500Percentage: Number,
  acceptedDate: Date,
  period: String,
});

const FundsFeed = mongoose.model("feed_funds", fundsFeedSchema);

module.exports = FundsFeed;
