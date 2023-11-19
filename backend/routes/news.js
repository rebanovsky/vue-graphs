const express = require("express");
const News = require("../controllers/news");

const router = express.Router();

router.route("/").get(News.getAllNews);

module.exports = router;