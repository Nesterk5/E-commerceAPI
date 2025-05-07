const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../auth/user.model");
require("dotenv").config();

// Register route
router.post("/register", async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      password: hashedPassword,
      role,
    });

    res.status(201).json({ message: "User registered", userId: user.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Registration failed" });
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });

    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Login failed" });
  }
});

module.exports = router;
