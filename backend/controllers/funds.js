const Fund = require("../models/fund");
const APIFeatures = require("../utils/apiFeatures");

exports.getAllFunds = async (req, res) => {
  try {
    // EXECUTE QUERY
    const features = new APIFeatures(Fund.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const funds = await features.query;

    // SEND RESPONSE
    res.status(200).json({
      status: "success",
      results: funds.length,
      data: {
        funds,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};