const express = require("express");
const router = express.Router();
const Return = require("../returns/model");

/**
 * @swagger
 * tags:
 *   name: Returns
 *   description: Returns management
 */

/**
 * @swagger
 * /returns:
 *   post:
 *     summary: Create a new return request
 *     tags: [Customers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Return'
 *     responses:
 *       201:
 *         description: return request created successfully
 *       400:
 *         description: Bad request
 */
// Create Return Request
router.post("/", async (req, res) => {
  try {
    const returnRequest = await Return.create(req.body);
    res.status(201).json(returnRequest);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @swagger
 * /returns:
 *   get:
 *     summary: Get a list of all return requests
 *     tags: [Returns]
 *     responses:
 *       200:
 *         description: List of return requests
 *       500:
 *         description: Internal server error
 */
// Get All Return Requests
router.get("/", async (req, res) => {
  try {
    const returns = await Return.findAll();
    res.status(200).json(returns);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /returns/{id}:
 *   get:
 *     summary: Get return request by ID
 *     tags: [Returns]
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
 *        description: Return found
 *       404:
 *         description: Return not found
 */
// Get Return by ID
router.get("/:id", async (req, res) => {
  try {
    const returnRequest = await Return.findByPk(req.params.id);
    if (returnRequest) {
      res.status(200).json(returnRequest);
    } else {
      res.status(404).json({ message: "Return not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /returns/{id}:
 *   put:
 *     summary: Update a return request
 *     tags: [Returns]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the return to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Return'
 *     responses:
 *       200:
 *         description: Return request updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Return request not found
 */
// Update Return (e.g., change status)
router.put("/:id", async (req, res) => {
  try {
    const returnRequest = await Return.findByPk(req.params.id);
    if (returnRequest) {
      await returnRequest.update(req.body);
      res.status(200).json(returnRequest);
    } else {
      res.status(404).json({ message: "Return not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @swagger
 * /returns/{id}:
 *   delete:
 *     summary: Delete a return request
 *     tags: [Returns]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the return request to delete
 *     responses:
 *       204:
 *         description: Return request deleted
 *       404:
 *         description: Return request not found
 */
// Delete Return
router.delete("/:id", async (req, res) => {
  try {
    const returnRequest = await Return.findByPk(req.params.id);
    if (returnRequest) {
      await returnRequest.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Return not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;