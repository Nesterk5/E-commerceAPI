const Order = require("../orders/model");

// Create order
exports.createOrder = async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get order by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404).json({ error: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update order
exports.updateOrder = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (order) {
      await order.update(req.body);
      res.status(200).json(order);
    } else {
      res.status(404).json({ error: "Order not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete order
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (order) {
      await order.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ error: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
