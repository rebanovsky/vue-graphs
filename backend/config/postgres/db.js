const { Pool } = require("pg");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.resolve(__dirname, "../../config.env") });


const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DB,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
  ssl: {
    rejectUnauthorized: false // NEEDS TO BE FIXED FOR PRODUCTION (USE SSL)
  }
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
