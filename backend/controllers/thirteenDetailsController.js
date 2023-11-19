const ThirteenDetails = require("./../models/thirteenDetailsModel");
const APIFeatures = require("./../utils/apiFeatures");

exports.getAllThirteenDetails = async (req, res) => {
  try {
    // Check if required parameters are provided
    const cik = req.query.cik;
    const date = req.query.date;

    if (!cik || !date) {
      return res.status(400).json({
        status: "fail",
        message: "Both 'cik' and 'date' parameters are required.",
      });
    }

    const features = new APIFeatures(
      ThirteenDetails.aggregate([
        { $match: { cik: cik, date: date } },
        { $unwind: "$companies" },
        { $sort: { "companies.value_curr": -1 } },
        {
          $project: {
            _id: 0,
            "companies.isAdded": 1,
            "companies.isRemoved": 1,
            "companies.nameOfIssuer": 1,
            "companies.titleOfClass": 1,
            "companies.value_curr": 1,
            "companies.value_diff": 1,
            "companies.shares_curr": 1,
            "companies.shares_diff": 1,
          },
        },
        { $replaceRoot: { newRoot: "$companies" } },
      ]),
      req.query
    ).paginate();

    const holdings = await features.query;

    // SEND RESPONSE
    res.status(200).json({
      status: "success",
      results: holdings.length,
      data: {
        holdings,
      },
    });
  } catch (err) {
    console.error(err); // Log the error to the console
    res.status(404).json({
      status: "fail",
      message: err.message || err.toString(),
    });
  }
};
