const checkPremiumStatus = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: 'User not authenticated' });
  }
  if (req.user.subscriptionStatus !== 'PREMIUM') {
    return res.status(403).json({ error: 'Premium subscription required to access this resource' });
  }
  next();
};

module.exports = { checkPremiumStatus };
