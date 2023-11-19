const axios = require("axios");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.resolve(__dirname, "../../../config.env") });

function get_stock_ticker(ticker) {
  console.log(`Called get_stock_ticker for company: ${ticker}`);

  return JSON.stringify({
    ticker: ticker,
  });
}

function get_income_statement(ticker) {
  console.log(`Called get_income_statement for company: ${ticker}`);
  // TODO: fetch the income statement for the company using its ticker and return it.
  return JSON.stringify({
    incomeStatement: "Sample Income Statement Data for " + ticker, // Placeholder
  });
}

function get_balance_sheet(ticker) {
  console.log(`Called get_balance_sheet for company: ${ticker}`);
  // TODO: fetch the balance sheet for the company using its ticker and return it.
  return JSON.stringify({
    balanceSheet: "Sample Balance Sheet Data for " + ticker, // Placeholder
  });
}

function get_cash_flow_statement(ticker) {
  console.log(`Called get_cash_flow_statement for company: ${ticker}`);
  // TODO: fetch the cash flow statement for the company using its ticker and return it.
  return JSON.stringify({
    cashFlowStatement: "Sample Cash Flow Statement Data for " + ticker, // Placeholder
  });
}

function get_country_iso(countryName) {
  console.log(`Called get_country_iso for country: ${countryName}`);
  // TODO: fetch the 3-letter country abbreviation (ISO code) for the mentioned country.
  // This is a placeholder, you'll need to implement this correctly.
  return JSON.stringify({
    iso: "USA", // Placeholder
  });
}

async function run_conversation(userContent) {
  const baseURL = "https://api.openai.com/v1/chat/completions";

  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + process.env.OPENAI_API_KEY,
  };

  let data = {
    messages: [
      {
        role: "system",
        content:
          "You are a financial data analyst designed to help users find optimal investment strategies. You can provide stock tickers, country codes, and financial reports like the income statement, balance sheet, or cash flow statement for companies. Follow the instructions in your response...",
      },
      {
        role: "user",
        content: userContent,
      },
    ],
    model: "gpt-4-0613",
    // stream: true,
    functions: [
      {
        name: "get_stock_ticker",
        description:
          "Get the stock ticker of the company mentioned by the user, e.g. if users mentiones apple in the context of a company, then respond only with the ticker name in this case AAPL and nothing else, dont need full sentence only the ticker ",
        parameters: {
          type: "object",
          properties: {
            ticker: {
              type: "string",
              description:
                "get the ticker of a company if user asks  about company that is listed in the USA, e.g. AAPL",
            },
          },
          // required: ["ticker"],
        },
      },
      {
        name: "get_country_iso",
        description:
          "Get the 3-letter country abbreviation (iso code) of the country mentioned by the user, e.g. if users mentiones armenia in the context of a country, then respond only with that country's abbreviation, in this case ARM but always respond only with iso code i.e. only 'ARM' and nothing else, dont need full sentence only the code itself.",
        parameters: {
          type: "object",
          properties: {
            countryName: {
              type: "string",
              description:
                "get the three letter abbreviaition of a country if user asks anything about a country, e.g. USA",
            },
          },
        },
      },
      {
        name: "get_income_statement",
        description:
          "Get the income statement of the company mentioned by the user.",
        parameters: {
          type: "object",
          properties: {
            ticker: {
              type: "string",
              description: "Ticker of the company.",
            },
          },
          // required: ["ticker"],
        },
      },
      {
        name: "get_balance_sheet",
        description:
          "Get the balance sheet of the company mentioned by the user.",
        parameters: {
          type: "object",
          properties: {
            ticker: {
              type: "string",
              description: "Ticker of the company.",
            },
          },
          // required: ["ticker"],
        },
      },
      {
        name: "get_cash_flow_statement",
        description:
          "Get the cash flow statement of the company mentioned by the user.",
        parameters: {
          type: "object",
          properties: {
            ticker: {
              type: "string",
              description: "Ticker of the company.",
            },
          },
          // required: ["ticker"],
        },
      },
    ],
    function_call: "auto",
  };

  try {
    console.log(`Sending initial request to OpenAI API...`);
    let response = await axios.post(baseURL, data, { headers });
    response = response.data;

    let executedFunctions = {};

    while (
      response.choices[0].message.function_call &&
      response.choices[0].finish_reason !== "stop"
    ) {
      let message = response.choices[0].message;
      const function_name = message.function_call.name;

      if (executedFunctions[function_name]) {
        break;
      }
      let function_response = "";
      switch (function_name) {
        case "get_stock_ticker":
          let tickerArgs = JSON.parse(message.function_call.arguments);
          console.log("ticker: ", tickerArgs.ticker);
          function_response = get_stock_ticker(tickerArgs.ticker);
          break;
        case "get_country_iso":
          let countryArgs = JSON.parse(message.function_call.arguments);
          console.log("country: ", countryArgs.ticker);
          function_response = get_country_iso(countryArgs.ticker);
          break;
        case "get_income_statement":
          let incomeStatementArgs = JSON.parse(message.function_call.arguments);
          function_response = get_income_statement(incomeStatementArgs.ticker);
          break;
        case "get_balance_sheet":
          let balanceSheetArgs = JSON.parse(message.function_call.arguments);
          function_response = get_balance_sheet(balanceSheetArgs.ticker);
          break;
        case "get_cash_flow_statement":
          let cashFlowArgs = JSON.parse(message.function_call.arguments);
          function_response = get_cash_flow_statement(cashFlowArgs.ticker);
          break;
        default:
          throw new Error(`Unsupported function: ${function_name}`);
      }
      executedFunctions[function_name] = true;

      data.messages.push({
        role: "function",
        name: function_name,
        content: function_response,
      });

      console.log(
        `Sending request to OpenAI with ${function_name} response...`
      );
      response = await axios.post(baseURL, data, { headers });
      response = response.data;
    }

    response = await axios.post(baseURL, data, { headers });
    response = response.data;

    return response;
  } catch (error) {
    console.error("Error:", error);
  }
}

module.exports = run_conversation;
