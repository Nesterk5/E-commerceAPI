const Courier = require("../courier/model");

// Create
exports.createCourier = async (req, res) => {
  try {
    const courier = await Courier.create(req.body);
    res.status(201).json(courier);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all
exports.getAllCouriers = async (req, res) => {
  try {
    const couriers = await Courier.findAll();
    res.status(200).json(couriers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get one
exports.getCourierById = async (req, res) => {
  try {
    const courier = await Courier.findByPk(req.params.id);
    if (!courier) {
      return res.status(404).json({ message: "Courier not found" });
    }
    res.status(200).json(courier);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update
exports.updateCourier = async (req, res) => {
  try {
    const courier = await Courier.findByPk(req.params.id);
    if (!courier) {
      return res.status(404).json({ message: "Courier not found" });
    }
    await courier.update(req.body);
    res.status(200).json(courier);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete
exports.deleteCourier = async (req, res) => {
  try {
    const courier = await Courier.findByPk(req.params.id);
    if (!courier) {
      return res.status(404).json({ message: "Courier not found" });
    }
    await courier.destroy();
    res.status(200).json({ message: "Courier deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
