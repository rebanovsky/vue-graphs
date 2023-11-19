const express = require("express");
const morgan = require("morgan");
const routes = require('./routes');
// MIDDLEWARES
const corsHandler = require("./middleware/corsHandler");
const requestTimeLogger = require("./middleware/requestTimeLogger");

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.disable("etag");

app.use(corsHandler);
app.use(requestTimeLogger);
app.use(routes);

module.exports = { app };