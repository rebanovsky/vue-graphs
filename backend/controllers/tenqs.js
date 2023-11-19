const Tenq = require("../models/tenq");
const APIFeatures = require("../utils/apiFeatures");

exports.getAllTenqs = async (req, res) => {
  try {
    // EXECUTE QUERY

    const features = new APIFeatures(
      Tenq.find()
        .sort({filedAt: -1 })
        .limit(100)
        .setOptions({ allowDiskUse: true }),
      req.query
    )
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const tenqs = await features.query;

    // SEND RESPONSE
    res.status(200).json({
      status: "success",
      results: tenqs.length,
      data: {
        tenqs,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};