const mongoose = require("mongoose");
const {
  Schema,
  SchemaTypes: { ObjectId },
} = mongoose;

const watchlistSchema = new Schema({
  userId: { type: ObjectId, required: true }, // Reference to the user who owns this watchlist
  name: { type: String, required: true }, // Name of the watchlist, e.g., "Tech Stocks"
  tickers: [
    {
      symbol: { type: String, required: true },
      addedOn: { type: Date, default: Date.now }, // Date when this ticker was added to the watchlist
    },
  ],
  createdOn: { type: Date, default: Date.now }, // Date when the watchlist was created
  lastModified: { type: Date, default: Date.now }, // Date when the watchlist was last modified
});

const Watchlist = mongoose.model("watchlists", watchlistSchema);

module.exports = Watchlist;
