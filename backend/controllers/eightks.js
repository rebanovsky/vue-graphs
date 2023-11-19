const Eightk = require("./../models/eightk");
const APIFeatures = require("./../utils/apiFeatures");

exports.getAllEightks = async (req, res) => {
  try {
    
    // EXECUTE QUERY
    const features = new APIFeatures(
      Eightk.find()
        .sort({ filedAt: -1 })
        .limit(100)
        .setOptions({ allowDiskUse: true }),
      req.query
    )
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const eightks = await features.query;

    // SEND RESPONSE
    res.status(200).json({
      status: "success",
      results: eightks.length,
      data: {
        eightks,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
