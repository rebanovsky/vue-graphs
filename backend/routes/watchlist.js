const express = require('express');
const watchlistController = require('../controllers/watchlist');
const authController = require('../controllers/auth');


const router = express.Router();

 // endpoint: api/watchlists

// Add Watchlist
router.route('/').post(authController.protect, watchlistController.createWatchlist);

// Delete Watchlist
router.route('/:id').delete(watchlistController.deleteWatchlist);

// Update Watchlist
router.route('/:id').patch(watchlistController.updateWatchlist);

// Get All Watchlists for a user
router.route('/user/:userId').get(watchlistController.getAllWatchlistsForUser);

// Get Specific Watchlist by ID
router.route('/:id').get(watchlistController.getWatchlistById);

module.exports = router;
