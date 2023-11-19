const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const incomeStatementSchema = new Schema({
    date: String,
    symbol: String,
    reportedCurrency: String,
    cik: Number,
    fillingDate: String,
    acceptedDate: String,
    calendarYear: Number,
    period: String,
    revenue: Number,
    costOfRevenue: Number,
    grossProfit: Number,
    grossProfitRatio: Number,
    ResearchAndDevelopmentExpenses: Number,
    GeneralAndAdministrativeExpenses: Number,
    SellingAndMarketingExpenses: Number,
    sellingGeneralAndAdministrativeExpenses: Number,
    otherExpenses: Number,
    operatingExpenses: Number,
    costAndExpenses: Number,
    interestExpense: Number,
    depreciationAndAmortization: Number,
    EBITDA: Number,
    EBITDARatio: Number,
    operatingIncome: Number,
    operatingIncomeRatio: Number,
    totalOtherIncomeExpensesNet: Number,
    incomeBeforeTax: Number,
    incomeBeforeTaxRatio: Number,
    incomeTaxExpense: Number,
    netIncome: Number,
    netIncomeRatio: Number,
    EPS: Number,
    EPSDiluted: Number,
    weightedAverageShsOut: Number,
    weightedAverageShsOutDil: Number
});

const IncomeStatement = mongoose.model('income_statements', incomeStatementSchema);

module.exports = IncomeStatement;