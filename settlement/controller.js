const Settlement = require("../settlement/model");

// Create Settlement
exports.createSettlement = async (req, res) => {
  try {
    const settlement = await Settlement.create(req.body);
    res.status(201).json(settlement);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get All settlements
exports.getAllSettlements = async (req, res) => {
  try {
    const settlements = await Settlement.findAll();
    res.status(200).json(settlements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get settlement by ID
exports.getSettlementById = async (req, res) => {
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
};

// Update Settlement
exports.updateSettlement = async (req, res) => {
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
};

// Delete Settlement
exports.deleteSettlement = async (req, res) => {
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
};
