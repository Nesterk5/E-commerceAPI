const express = require("express");
const router = express.Router();
const Fulfilment = require("../fulfilment/model");

/**
 * @swagger
 * tags:
 *   name: Fulfilments
 *   description: Fulfilment management
 */


/**
 * @swagger
 * /fulfilments:
 *   post:
 *     summary: Create a new fulfilment
 *     tags: [Fulfilments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Fulfilment'
 *     responses:
 *       201:
 *         description: Fulfilment created successfully
 *       400:
 *         description: Bad request
 */
// Create Fulfilment
router.post("/", async (req, res) => {
  try {
    const fulfilment = await Fulfilment.create(req.body);
    res.status(201).json(fulfilment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @swagger
 * /fulfilments:
 *   get:
 *     summary: Get all fulfilments
 *     tags: [Fulfilments]
 *     responses:
 *       200:
 *         description: List of fulfilments
 *       500:
 *         description: Internal server error
 */
// Get All Fulfilments
router.get("/", async (req, res) => {
  try {
    const fulfilments = await Fulfilment.findAll();
    res.status(200).json(fulfilments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /fulfilments/{id}:
 *   get:
 *     summary: Get fulfilment by ID
 *     tags: [Fulfilments]
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
 *        description: fulfilment found
 *       404:
 *         description: fulfilment not found
 */
// Get Fulfilment by ID
router.get("/:id", async (req, res) => {
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
});

/**
 * @swagger
 * /fulfilments/{id}:
 *   put:
 *     summary: Update a fulfilment
 *     tags: [Fulfilments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the fulfilment to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Fulfilment'
 *     responses:
 *       200:
 *         description: Fulfilment updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Fulfilment not found
 */

// Update Fulfilment
router.put("/:id", async (req, res) => {
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
});

/**
 * @swagger
 * /fulfilments/{id}:
 *   delete:
 *     summary: Delete a fulfilment
 *     tags: [Fulfilments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the fulfilment to delete
 *     responses:
 *       204:
 *         description: Fulfilment deleted
 *       404:
 *         description: Fulfilment not found
 *       500:
 *         description: Internal server error
 */
// Delete Fulfilment
router.delete("/:id", async (req, res) => {
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
});

module.exports = router;