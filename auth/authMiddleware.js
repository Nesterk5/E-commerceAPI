const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET_KEY;

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header("Authorization");

  // Check if no token
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // { userId, role }
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};
