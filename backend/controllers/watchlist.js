const Watchlist = require("../models/watchlist");

const watchlistController = {
  // Add Watchlist
  createWatchlist: async (req, res) => {
    try {
      const { name, description } = req.body;
      const userId = req.user._id;
      const watchlist = new Watchlist({
        userId,
        name,
        description,
        createdOn: new Date(),
        lastModified: new Date(),
      });
      await watchlist.save();
      res.status(201).json(watchlist);
    } catch (error) {
      console.error("Full error:", error);
      res.status(500).json({ message: error.message });
    }
  },

  // Delete Watchlist
  deleteWatchlist: async (req, res) => {
    try {
      const watchlistId = req.params.id;
      await Watchlist.findByIdAndDelete(watchlistId);
      res.status(200).json({ message: "Watchlist deleted successfully!" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Update Watchlist
  updateWatchlist: async (req, res) => {
    try {
      const watchlistId = req.params.id;
      const { symbol } = req.body;

      // First, fetch the current watchlist by ID
      const currentWatchlist = await Watchlist.findById(watchlistId);

      // Check if the ticker symbol already exists in the tickers array
      const tickerExists = currentWatchlist.tickers.some(
        (ticker) => ticker.symbol === symbol
      );

      if (tickerExists) {
        return res
          .status(400)
          .json({ message: "Ticker already exists in the watchlist." });
      }

      const tickerData = {
        symbol: symbol,
        addedOn: new Date(),
      };

      console.log("tickerData: ", tickerData);

      const updatedWatchlist = await Watchlist.findByIdAndUpdate(
        watchlistId,
        { $push: { tickers: tickerData }, lastModified: new Date() },
        { new: true }
      );

      res.status(200).json(updatedWatchlist);
    } catch (error) {
      console.error("Full error:", error);
      res.status(500).json({ message: error.message });
    }
  },

  // Get All Watchlists for a user
  getAllWatchlistsForUser: async (req, res) => {
    try {
      const userId = req.params.userId;
      const watchlists = await Watchlist.find({ userId });
      res.status(200).json(watchlists);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get Specific Watchlist by ID
  getWatchlistById: async (req, res) => {
    try {
      const watchlistId = req.params.id;
      const watchlist = await Watchlist.findById(watchlistId);
      if (!watchlist) {
        return res.status(404).json({ message: "Watchlist not found!" });
      }
      res.status(200).json(watchlist);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = watchlistController;
