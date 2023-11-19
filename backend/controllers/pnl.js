const IncomeStatement = require("../models/pnl");

const incomeStatementController = {
  getAll: async (req, res) => {
    try {
      const incomeStatements = await IncomeStatement.find();
      res.status(200).json(incomeStatements);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getByTicker: async (req, res) => {
    try {
      const ticker = req.params.ticker.toUpperCase();
      const incomeStatements = await IncomeStatement.find({
        symbol: ticker,
      }).sort({ calendarYear: -1 });
      if (!incomeStatements.length) {
        return res
          .status(404)
          .json({ message: "No income statements found for the given ticker" });
      }
      res.status(200).json(incomeStatements);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getByTickerAndYear: async (req, res) => {
    try {
      const ticker = req.params.ticker.toUpperCase();
      const year = parseInt(req.params.year);
      const incomeStatement = await IncomeStatement.findOne({
        symbol: ticker,
        calendarYear: year,
      });

      if (!incomeStatement) {
        return res.status(404).json({
          message: "Income statement not found for the given ticker and year",
        });
      }
      res.status(200).json(incomeStatement);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = incomeStatementController;
