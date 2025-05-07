const Admin = require("../admin/model");

// Create admin
exports.createAdmin = async (req, res) => {
  try {
    const admin = await Admin.create(req.body);
    res.status(201).json(admin);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all admins
exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.findAll();
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get admin by ID
exports.getAdminById = async (req, res) => {
  try {
    const admin = await Admin.findByPk(req.params.id);
    if (admin) {
      res.status(200).json(admin);
    } else {
      res.status(404).json({ error: "Admin not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update admin
exports.updateAdmin = async (req, res) => {
  try {
    const admin = await Admin.findByPk(req.params.id);
    if (admin) {
      await admin.update(req.body);
      res.status(200).json(admin);
    } else {
      res.status(404).json({ error: "Admin not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete admin
exports.deleteAdmin = async (req, res) => {
  try {
    const admin = await Admin.findByPk(req.params.id);
    if (admin) {
      await admin.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ error: "Admin not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
