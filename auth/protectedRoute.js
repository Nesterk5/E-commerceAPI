const express = require("express");
const router = express.Router();
const verifyToken = require("../auth/authMiddleware");
// Protected route
router.get("/", verifyToken, (req, res) => {
  res.status(200).json({ message: "Protected route accessed" });
});

module.exports = router;
