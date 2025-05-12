const express = require("express");
const router = express.Router();
const Fulfilment = require("../fulfilment/model");

/**
 * @swagger
 * tags:
 *   name: Fulfilments
 *   description: Fulfilment management
 */


// Create Fulfilment
router.post("/", async (req, res) => {
  try {
    const fulfilment = await Fulfilment.create(req.body);
    res.status(201).json(fulfilment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get All Fulfilments
router.get("/", async (req, res) => {
  try {
    const fulfilments = await Fulfilment.findAll();
    res.status(200).json(fulfilments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Fulfilment by ID
router.get("/:id", async (req, res) => {
  try {
    const fulfilment = await Fulfilment.findByPk(req.params.id);
    if (fulfilment) {
      res.status(200).json(fulfilment);
    } else {
      res.status(404).json({ message: "Fulfilment not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Fulfilment
router.put("/:id", async (req, res) => {
  try {
    const fulfilment = await Fulfilment.findByPk(req.params.id);
    if (fulfilment) {
      await fulfilment.update(req.body);
      res.status(200).json(fulfilment);
    } else {
      res.status(404).json({ message: "Fulfilment not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete Fulfilment
router.delete("/:id", async (req, res) => {
  try {
    const fulfilment = await Fulfillment.findByPk(req.params.id);
    if (fulfilment) {
      await fulfilment.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Fulfilment not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;