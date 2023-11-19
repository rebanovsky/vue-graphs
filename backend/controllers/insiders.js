const Insiders = require("./../models/insider");
const APIFeatures = require("../utils/apiFeatures");

exports.getAllInsiders = async (req, res) => {
  try {
    // EXECUTE QUERY

    const features = new APIFeatures(
      Insiders.find()
        .sort({filingDate: -1 })
        .limit(100)
        .setOptions({ allowDiskUse: true }),
      req.query
    )
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const insiders = await features.query;

    // SEND RESPONSE
    res.status(200).json({
      status: "success",
      results: insiders.length,
      data: {
        insiders,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};