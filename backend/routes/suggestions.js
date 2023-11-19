const express = require('express');
const router = express.Router();
const suggestionsController = require('../controllers/suggestions');

router.get("/", suggestionsController.searchSuggestions);

module.exports = router;