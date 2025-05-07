const Vendor = require("../vendor/model");


// Create vendor
exports.createVendor = async (req, res) => {
  try {
    const vendor = await Vendor.create(req.body);
    res.status(201).json(vendor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// Get all vendors
exports.getAllVendors = async (req, res) => {
  try {
    const vendors = await Vendor.findAll();
    res.status(200).json(vendors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Get vendor by ID
exports.getVendorById = async (req, res) => {
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
};

// Update vendor
exports.updateVendor = async (req, res) => {
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
};

// Delete vendor
exports.deleteVendor = async (req, res) => {
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
};
