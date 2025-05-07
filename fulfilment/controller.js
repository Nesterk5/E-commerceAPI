const Fulfilment = require("../fulfilment/model");

// Create Fulfilment
exports.createFulfilment = async (req, res) => {
  try {
    const fulfilment = await Fulfilment.create(req.body);
    res.status(201).json(fulfilment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get All Fulfilments
exports.getAllFulfilments = async (req, res) => {
  try {
    const fulfilments = await Fulfilment.findAll();
    res.status(200).json(fulfilments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Fulfilment by ID
exports.getFulfilmentById = async (req, res) => {
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
};

// Update Fulfilment
exports.updateFulfilment = async (req, res) => {
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
};

// Delete Fulfilment
exports.deleteFulfilment = async (req, res) => {
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
};
