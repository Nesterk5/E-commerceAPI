const express = require("express");
const router = express.Router();
const Courier = require("../courier/model");

/**
 * @swagger
 * tags:
 *   name: Couriers
 *   description: Courier management
 */

/**
 * @swagger
 * /couriers:
 *   post:
 *     summary: Create a new courier
 *     tags: [Couriers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - first_name
 *               - last_name
 *               - user_id
 *             properties:
 *               first_name:
 *                 type: string
 *                 example: John
 *               last_name:
 *                 type: string
 *                 example: Doe
 *               email:
 *                 type: string
 *                 example: john.doe@example.com
 *               phone:
 *                 type: string
 *                 example: "+256700123456"
 *               vehicle_type:
 *                 type: string
 *                 example: bike
 *               vehicle_number:
 *                 type: string
 *                 example: UBA123C
 *               status:
 *                 type: string
 *                 example: active
 *               location:
 *                 type: string
 *                 example: Kampala
 *               joining_date:
 *                 type: string
 *                 format: date
 *                 example: 2024-05-07
 *               user_id:
 *                 type: integer
 *                 example: 3
 *     responses:
 *       201:
 *         description: Courier created successfully
 */

// Create courier
router.post("/", async (req, res) => {
  try {
    const courier = await Courier.create(req.body);
    res.status(201).json(courier);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /couriers:
 *   get:
 *     summary: Get all couriers
 *     tags: [Couriers]
 *     responses:
 *       200:
 *         description: List of couriers
 */
// Get all couriers
router.get("/", async (req, res) => {
  try {
    const couriers = await Courier.findAll();
    res.status(200).json(couriers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /couriers/{id}:
 *   get:
 *     summary: Get a courier by ID
 *     tags: [Couriers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The courier ID
 *     responses:
 *       200:
 *         description: Courier found
 *       404:
 *         description: Courier not found
 */
// Get one courier by id
router.get("/:id", async (req, res) => {
  try {
    const courier = await Courier.findByPk(req.params.id);
    if (!courier) {
      return res.status(404).json({ message: "Courier not found" });
    }
    res.status(200).json(courier);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /couriers/{id}:
 *   put:
 *     summary: Update a courier by ID
 *     tags: [Couriers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The courier ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *                 example: Jane
 *               last_name:
 *                 type: string
 *                 example: Doe
 *               email:
 *                 type: string
 *                 example: jane.doe@example.com
 *               phone:
 *                 type: string
 *                 example: "+256772123456"
 *               vehicle_type:
 *                 type: string
 *                 example: van
 *               vehicle_number:
 *                 type: string
 *                 example: UBX456D
 *               status:
 *                 type: string
 *                 example: inactive
 *               location:
 *                 type: string
 *                 example: Entebbe
 *               joining_date:
 *                 type: string
 *                 format: date
 *                 example: 2023-12-01
 *               user_id:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Courier updated successfully
 *       404:
 *         description: Courier not found
 */
// Update courier
router.put("/:id", async (req, res) => {
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
});

/**
 * @swagger
 * /couriers/{id}:
 *   delete:
 *     summary: Delete a courier by ID
 *     tags: [Couriers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The courier ID
 *     responses:
 *       200:
 *         description: Courier deleted successfully
 *       404:
 *         description: Courier not found
 */
// Delete courier
router.delete("/:id", async (req, res) => {
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
});

module.exports = router;
