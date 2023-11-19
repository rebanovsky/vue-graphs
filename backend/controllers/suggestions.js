const Company = require('../models/company');
const Country = require('../models/country');

exports.searchSuggestions = async (req, res) => {
  const searchTerm = req.query.search;
  if (!searchTerm) {
    res.json([]);
    return;
  }

  try {
    const regex = new RegExp("^" + searchTerm, "i");

    const companySuggestions = await Company.find({
      $or: [{ name: { $regex: regex } }, { symbol: { $regex: regex } }],
    })
      .sort({ name: 1 })
      .limit(5);

    const countrySuggestions = await Country.find({
      name: { $regex: regex }
    })
      .limit(5);

    // Map over results to unify field name and add type
    const mappedCompanySuggestions = companySuggestions.map(company => ({
      ...company._doc, 
      name: company.name, 
      type: 'COMPANY',
      path: `/company/${company.symbol}/overview`
    }));
    
    const mappedCountrySuggestions = countrySuggestions.map(country => ({
      ...country._doc, 
      type: 'COUNTRY',
      path: `/regions/${country.iso2}/overview`
    }));

    // Merging the results
    const mergedSuggestions = [...mappedCompanySuggestions, ...mappedCountrySuggestions];

    res.json(mergedSuggestions);
  } catch (error) {
    console.error("Error with search term:", error);
    res.json([]);
  }
};

