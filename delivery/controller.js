const Delivery = require("../delivery/model");

// Create delivery
exports.createDelivery = async (req, res) => {
  try {
    const delivery = await Delivery.create(req.body);
    res.status(201).json(delivery);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all deliveries
exports.getAllDeliveries = async (req, res) => {
  try {
    const deliveries = await Delivery.findAll();
    res.status(200).json(deliveries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get delivery by ID
exports.getDeliveryById = async (req, res) => {
  try {
    const delivery = await Delivery.findByPk(req.params.id);
    if (delivery) {
      res.status(200).json(delivery);
    } else {
      res.status(404).json({ error: "Delivery not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update delivery
exports.updateDelivery = async (req, res) => {
  try {
    const delivery = await Delivery.findByPk(req.params.id);
    if (delivery) {
      await delivery.update(req.body);
      res.status(200).json(delivery);
    } else {
      res.status(404).json({ error: "Delivery not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete delivery
exports.deleteDelivery = async (req, res) => {
  try {
    const delivery = await Delivery.findByPk(req.params.id);
    if (delivery) {
      await delivery.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ error: "Delivery not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
