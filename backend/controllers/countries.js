const Countries = require("../models/country");
const APIFeatures = require("../utils/apiFeatures");

exports.getAllCountries = async (req, res) => {
  try {
    console.log(req.query);
    const features = new APIFeatures(Countries.find(), req.query)
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

exports.validateIso2 = async (req, res) => {
  try {
      const iso2 = req.params.iso2;
      const exists = await Countries.exists({ iso2: iso2 }); // Check if the iso2 exists in the database

      if (exists) {
          res.status(200).send({ valid: true });
      } else {
          res.status(404).send({ valid: false });
      }
  } catch (err) {
      res.status(500).json({
          status: "fail",
          message: err.message,
      });
  }
};
