const express = require("express");
const router = express.Router();
const Vendor = require("../vendor/model");

/**
 * @swagger
 * tags:
 *   name: Vendors
 *   description: Vendor management
 */


// Create vendor
router.post("/", async (req, res) => {
  try {
    const vendor = await Vendor.create(req.body);
    res.status(201).json(vendor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all vendors
router.get("/", async (req, res) => {
  try {
    const vendors = await Vendor.findAll();
    res.status(200).json(vendors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get vendor by ID
router.get("/:id", async (req, res) => {
  try {
    const vendor = await Vendor.findByPk(req.params.id);
    if (vendor) {
      res.status(200).json(vendor);
    } else {
      res.status(404).json({ error: "Vendor not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update vendor
router.put("/:id", async (req, res) => {
  try {
    const vendor = await Vendor.findByPk(req.params.id);
    if (vendor) {
      await vendor.update(req.body);
      res.status(200).json(vendor);
    } else {
      res.status(404).json({ error: "Vendor not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete vendor
router.delete("/:id", async (req, res) => {
  try {
    const vendor = await Vendor.findByPk(req.params.id);
    if (vendor) {
      await vendor.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ error: "Vendor not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
