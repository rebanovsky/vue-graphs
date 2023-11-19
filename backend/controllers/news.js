const News = require("../models/news");

module.exports = {
  getAllNews: async (req, res) => {
    try {
      const query = {};

      // Pagination parameters
      const page = parseInt(req.query.page, 10) || 1; // Default to page 1 if not provided
      const limit = parseInt(req.query.limit, 10) || 50; // Default to 10 items per page if not provided
      const skip = (page - 1) * limit;

      if (req.query.sourceName) {
        query["sourceName"] = { $in: req.query.sourceName.split(",") };
      }

      // Find total count for the query to return the total number of pages
      const totalItems = await News.countDocuments(query);

      console.log("query: ", query);

      const news = await News.find(query)
        .sort({ dateTimePub: -1 })
        .skip(skip)
        .limit(limit)
        .exec();

      res.status(200).json(news);
    } catch (err) {
      res.status(404).json({
        status: "fail",
        message: err.message,
      });
    }
  },
};
