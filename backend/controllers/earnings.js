const Earnings = require("../models/earnings");
const APIFeatures = require("./../utils/apiFeatures");

exports.getAllEarnings = async (req, res) => {
  try {
    // EXECUTE QUERY
    const features = new APIFeatures(
      Earnings.find()
        .sort({ mcap: -1 })
        .limit(100)
        .setOptions({ allowDiskUse: true }),
      req.query
    )
      .filter()
      .sort()
      .limitFields()
      .paginate();
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
