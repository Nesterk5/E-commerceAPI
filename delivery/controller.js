const express = require("express");
const router = express.Router();
const Delivery = require("../delivery/model");

/**
 * @swagger
 * tags:
 *   name: Deliveries
 *   description: Delivery management
 */

/**
 * @swagger
 * /deliveries:
 *   post:
 *     summary: Create a new delivery
 *     tags: [Deliveries]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Delivery'
 *     responses:
 *       201:
 *         description: Delivery created successfully
 *       400:
 *         description: Bad request
 */
// Create delivery
router.post("/", async (req, res) => {
  try {
    const delivery = await Delivery.create(req.body);
    res.status(201).json(delivery);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @swagger
 * /deliveries:
 *   get:
 *     summary: Get all deliveries
 *     tags: [Deliveries]
 *     responses:
 *       200:
 *         description: List of all deliveries
 *       500:
 *         description: Internal server error
 */
// Get all deliveries
router.get("/", async (req, res) => {
  try {
    const deliveries = await Delivery.findAll();
    res.status(200).json(deliveries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /deliveries/{id}:
 *   get:
 *     summary: Get delivery by ID
 *     tags: [Deliveries]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       500:
 *         description: Internal server error
 *       200:
 *        description: Delivery found
 *       404:
 *         description: Delivery not found
 */
// Get delivery by ID
router.get("/:id", async (req, res) => {
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
});

/**
 * @swagger
 * /deliveries/{id}:
 *   put:
 *     summary: Update a delivery
 *     tags: [Deliveries]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the delivery to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Delivery'
 *     responses:
 *       200:
 *         description: Delivery updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Delivery not found
 */
// Update delivery
router.put("/:id", async (req, res) => {
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
});

/**
 * @swagger
 * /deliveries/{id}:
 *   delete:
 *     summary: Delete a delivery
 *     tags: [Deliveries]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the delivery to delete
 *     responses:
 *       204:
 *         description: delivery deleted
 *       404:
 *         description: delivery not found
 */
// Delete delivery
router.delete("/:id", async (req, res) => {
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
});

module.exports = router;