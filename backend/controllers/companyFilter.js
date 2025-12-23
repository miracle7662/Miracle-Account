const companyFilter = (req, res, next) => {
  // The JWT authentication middleware should have already populated req.user
  if (!req.user) {
    return res.status(401).json({ error: 'Authentication error: User not found.' });
  }

  const { companyid, yearid } = req.user;

  // Check if companyid and yearid are present in the user's token payload
  if (!companyid || !yearid) {
    return res.status(401).json({ error: 'Unauthorized: companyid and yearid not found in token.' });
  }

  // Attach companyid and yearid to the request object for controllers to use
  req.companyid = companyid;
  req.yearid = yearid;

  // Proceed to the next middleware or route handler
  next();
};

module.exports = companyFilter;