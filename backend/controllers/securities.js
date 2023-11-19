const Securities = require("./../models/security");
const APIFeatures = require("../utils/apiFeatures");

exports.getAllSecurities = async (req, res) => {
  try {
    // EXECUTE QUERY
    const features = new APIFeatures(
      Securities.find()
        .sort({ symbol: 1 })
        .limit(10)
        .setOptions({ allowDiskUse: true }),
      req.query
    )
      .filter()
      .sort()
      .limitFields();
    // .paginate();
    const data = await features.query;

    // SEND RESPONSE
    res.status(200).json(data[0]);
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
