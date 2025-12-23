module.exports = async (req, res, next) => {
  try {
    if (!req.user || !req.user.companyid) {
      return res.status(403).json({ message: "Company ID missing in token" });
    }

    // Extract companyid and yearid from JWT payload (req.user is set by authenticateToken middleware)
    req.companyid = req.user.companyid;  // accessible in all controllers
    req.yearid = req.user.yearid;        // optional, may be null

    next();
  } catch (error) {
    console.error('Error in companyFilter middleware:', error);
    res.status(500).json({ message: 'Internal server error during company filter' });
  }
};
