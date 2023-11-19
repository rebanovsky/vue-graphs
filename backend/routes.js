const express = require("express");
const router = express.Router();

// MONGO ROUTES
const insiderRouter = require("./routes/insiders");
const companiesRouter = require("./routes/companies");
const fundsRouter = require("./routes/funds");
const userRouter = require("./routes/users");
const securityRouter = require("./routes/securities");
const tenkRouter = require("./routes/tenkRoutes");
const eightkRouter = require("./routes/eightks");
const tenqRouter = require("./routes/tenqRoutes");
const newsRouter = require("./routes/news");
const earningsRouter = require("./routes/earnings");
const econIndicatorRouter = require("./routes/indicators");
const stockPriceRouter = require("./routes/stocks");
const countriesRouter = require("./routes/countries");
const suggestionsRoutes = require("./routes/suggestions");
const incomeStatementRoutes = require("./routes/pnl");
const watchlistRouter = require("./routes/watchlist");

router.use("/api/insiders", insiderRouter);
router.use("/api/company", companiesRouter);
router.use("/api/funds", fundsRouter);
router.use("/api/users", userRouter);
router.use("/api/security", securityRouter);
router.use("/api/ten-k", tenkRouter);
router.use("/api/eight-k", eightkRouter);
router.use("/api/ten-q", tenqRouter);
router.use("/api/news", newsRouter);
router.use("/api/earnings", earningsRouter);
router.use("/api/econ-indicators", econIndicatorRouter);
router.use("/api/stock-price", stockPriceRouter);
router.use("/api/countries", countriesRouter);
router.use("/api/suggestions", suggestionsRoutes);
router.use("/api/income-statements", incomeStatementRoutes);
router.use("/api/watchlists", watchlistRouter);


// POSTGRES ROUTES
const financialInfoRouter = require("./routes/postgres/financial_info");

router.use("/api/pg", financialInfoRouter);


module.exports = router;