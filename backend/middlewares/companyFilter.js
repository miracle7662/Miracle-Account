module.exports = async (req, res, next) => {
  try {
    // Extract companyid and yearid from headers (set by frontend after company/year selection)
    const companyid = req.headers['x-company-id'];
    const yearid = req.headers['x-year-id'];

    if (!companyid) {
      return res.status(403).json({ message: "Company ID missing in request headers" });
    }

    req.companyid = companyid;  // accessible in all controllers
    req.yearid = yearid;        // optional, may be null

    next();
  } catch (error) {
    console.error('Error in companyFilter middleware:', error);
    res.status(500).json({ message: 'Internal server error during company filter' });
  }
};
