// In a new file, say ./routes/financials.js
const express = require('express');
const router = express.Router();
const { getFinancialData } = require('../../controllers/postgres/countries');

router.get('/', getFinancialData);

module.exports = router;
