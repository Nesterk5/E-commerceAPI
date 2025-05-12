const express = require("express");
const router = express.Router();
const Settlement = require("../settlement/model");

/**
 * @swagger
 * tags:
 *   name: Settlements
 *   description: Settlements management
 */


// Create Settlement
router.post("/", async (req, res) => {
  try {
    const settlement = await Settlement.create(req.body);
    res.status(201).json(settlement);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get All settlements
router.get("/", async (req, res) => {
  try {
    const settlements = await Settlement.findAll();
    res.status(200).json(settlements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get settlement by ID
router.get("/:id", async (req, res) => {
  try {
    const settlement = await Settlement.findByPk(req.params.id);
    if (settlement) {
      res.status(200).json(settlement);
    } else {
      res.status(404).json({ message: "Settlement not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Settlement
router.put("/:id", async (req, res) => {
  try {
    const settlement = await Settlement.findByPk(req.params.id);
    if (settlement) {
      await settlement.update(req.body);
      res.status(200).json(settlement);
    } else {
      res.status(404).json({ message: "Settlement not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete Settlement
router.delete("/:id", async (req, res) => {
  try {
    const settlement = await Settlement.findByPk(req.params.id);
    if (settlement) {
      await settlement.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Settlement not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
