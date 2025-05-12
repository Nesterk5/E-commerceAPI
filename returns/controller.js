const express = require("express");
const router = express.Router();
const Return = require("../returns/model");

/**
 * @swagger
 * tags:
 *   name: Returns
 *   description: Returns management
 */


// Create Return Request
router.post("/", async (req, res) => {
  try {
    const returnRequest = await Return.create(req.body);
    res.status(201).json(returnRequest);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get All Return Requests
router.get("/", async (req, res) => {
  try {
    const returns = await Return.findAll();
    res.status(200).json(returns);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Return by ID
router.get("/:id", async (req, res) => {
  try {
    const returnRequest = await Return.findByPk(req.params.id);
    if (returnRequest) {
      res.status(200).json(returnRequest);
    } else {
      res.status(404).json({ message: "Return not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Return (e.g., change status)
router.put("/:id", async (req, res) => {
  try {
    const returnRequest = await Return.findByPk(req.params.id);
    if (returnRequest) {
      await returnRequest.update(req.body);
      res.status(200).json(returnRequest);
    } else {
      res.status(404).json({ message: "Return not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete Return
router.delete("/:id", async (req, res) => {
  try {
    const returnRequest = await Return.findByPk(req.params.id);
    if (returnRequest) {
      await returnRequest.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Return not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;