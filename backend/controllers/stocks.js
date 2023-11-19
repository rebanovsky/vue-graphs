const StockPrice = require("../models/stocks");
const APIFeatures = require("../utils/apiFeatures");

exports.getAllStockPrice = async (req, res) => {
  try {
    const features = new APIFeatures(
      StockPrice.find()
        .sort({t: -1 })
        .limit(120)
        .setOptions({ allowDiskUse: true }),
      req.query
    )
      .filter()
      .sort()
      .limitFields()
      // .paginate();
    const data = await features.query;

    res.status(200).json(data);
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};