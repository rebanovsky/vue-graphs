const keyMapping = {
    "Revenue": "revenue",
    "Cost of Revenue": "costOfRevenue",
    "Gross Profit": "grossProfit",
    "Gross Profit Ratio": "grossProfitRatio",
    "Research and Development Expenses": "ResearchAndDevelopmentExpenses",
    "General and Administrative Expenses": "GeneralAndAdministrativeExpenses",
    "Selling and Marketing Expenses": "SellingAndMarketingExpenses",
    "Selling, General and Administrative Expenses": "sellingGeneralAndAdministrativeExpenses",
    "Other Expenses": "otherExpenses",
    "Operating Expenses": "operatingExpenses",
    "Cost and Expenses": "costAndExpenses",
    "Interest Expense": "interestExpense",
    "Depreciation and Amortization": "depreciationAndAmortization",
    "EBITDA": "EBITDA",
    "EBITDA Ratio": "EBITDARatio",
    "Operating Income": "operatingIncome",
    "Operating Income Ratio": "operatingIncomeRatio",
    "Total Other Income/Expenses Net": "totalOtherIncomeExpensesNet",
    "Income Before Tax": "incomeBeforeTax",
    "Income Before Tax Ratio": "incomeBeforeTaxRatio",
    "Income Tax Expense": "incomeTaxExpense",
    "Net Income": "netIncome",
    "Net Income Ratio": "netIncomeRatio",
    "EPS": "EPS",
    "EPS Diluted": "EPSDiluted",
    "Weighted Average Shares Out": "weightedAverageShsOut",
    "Weighted Average Shares Out Diluted": "weightedAverageShsOutDil"
};

const rows = [
    { name: "Revenue", style: "border-b-[1px] border-slate-200" },
    { name: "Cost of Revenue" },
    { name: "Gross Profit" },
    { name: "Gross Profit Ratio" },
    { name: "Research and Development Expenses" },
    { name: "General and Administrative Expenses" },
    { name: "Selling and Marketing Expenses" },
    { name: "Selling, General and Administrative Expenses" },
    { name: "Other Expenses" },
    { name: "Operating Expenses" },
    { name: "Cost and Expenses" },
    { name: "Interest Expense" },
    { name: "Depreciation and Amortization" },
    { name: "EBITDA" },
    { name: "EBITDA Ratio" },
    { name: "Operating Income" },
    { name: "Operating Income Ratio" },
    { name: "Total Other Income/Expenses Net" },
    { name: "Income Before Tax" },
    { name: "Income Before Tax Ratio" },
    { name: "Income Tax Expense" },
    { name: "Net Income" },
    { name: "Net Income Ratio" },
    { name: "EPS" },
    { name: "EPS Diluted" },
    { name: "Weighted Average Shares Out" },
    { name: "Weighted Average Shares Out Diluted" }
];

export default function useIncomeStatement() {
    return {
        keyMapping,
        rows
    };
}