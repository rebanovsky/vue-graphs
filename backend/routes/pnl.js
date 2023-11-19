const express = require('express');
const incomeStatementController = require('../controllers/pnl');

const router = express.Router();

router.route('/').get(incomeStatementController.getAll); // endpoint:  api/income-statements
router.route('/:ticker').get(incomeStatementController.getByTicker);

module.exports = router;