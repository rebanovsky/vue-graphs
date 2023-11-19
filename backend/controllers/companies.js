const Companies = require("../models/company");
const APIFeatures = require("../utils/apiFeatures");

exports.createQuery = (searchTerm) => {
  return { $text: { $regex: searchTerm } };
};

exports.getAllCompanies = async (req, res) => {
  try {
    // { companyName: { $regex: /microso/i } }
    console.log(req.query);

    // EXECUTE QUERY
    const features = new APIFeatures(Companies.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const data = await features.query;
    res.status(200).json(data[0]);
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
