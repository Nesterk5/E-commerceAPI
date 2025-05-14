const express = require("express");
const router = express.Router();
const Settlement = require("../settlement/model");

/**
 * @swagger
 * tags:
 *   name: Settlements
 *   description: Settlements management
 */

/**
 * @swagger
 * /settlements:
 *   post:
 *     summary: Create a new settlement
 *     tags: [Settlements]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Settlement'
 *     responses:
 *       201:
 *         description: Settlement created successfully
 *       400:
 *         description: Bad request
 */
// Create Settlement
router.post("/", async (req, res) => {
  try {
    const settlement = await Settlement.create(req.body);
    res.status(201).json(settlement);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @swagger
 * /settlements:
 *   get:
 *     summary: Get a list of settlements
 *     tags: [Settlements]
 *     responses:
 *       200:
 *         description: List of settlements
 *       500:
 *         description: Internal server error
 */
// Get All settlements
router.get("/", async (req, res) => {
  try {
    const settlements = await Settlement.findAll();
    res.status(200).json(settlements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /settlements/{id}:
 *   get:
 *     summary: Get settlement by ID
 *     tags: [Settlements]
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
 *        description: Settlement found
 *       404:
 *         description: Settlement not found
 */
// Get settlement by ID
router.get("/:id", async (req, res) => {
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
});

/**
 * @swagger
 * /settlements/{id}:
 *   put:
 *     summary: Update a settlement
 *     tags: [Settlements]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the settlement to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Settlement'
 *     responses:
 *       200:
 *         description: Settlement updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Settlement not found
 */
// Update Settlement
router.put("/:id", async (req, res) => {
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
});

/**
 * @swagger
 * /settlements/{id}:
 *   delete:
 *     summary: Delete a settlement
 *     tags: [Settlements]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the settlement to delete
 *     responses:
 *       204:
 *         description: Settlement deleted
 *       404:
 *         description: Settlement not found
 */
// Delete Settlement
router.delete("/:id", async (req, res) => {
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
});

module.exports = router;
