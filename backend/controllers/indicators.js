const Indicator = require("./../models/indicator");
const APIFeatures = require("../utils/apiFeatures");

exports.getAllEconIndicators = async (req, res) => {
  try {
    // EXECUTE QUERY
    const features = new APIFeatures(
      Indicator.find()
        .sort({ date: 1 })
        .limit(200)
        .setOptions({ allowDiskUse: true }),
      req.query
    )
      .filter()
      .sort()
      .limitFields()
      // .paginate();
    const data = await features.query;

    // SEND RESPONSE
    res.status(200).json(data);
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};