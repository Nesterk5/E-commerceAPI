const express = require("express");
const router = express.Router();
const customerController = require("../customer/controller");

// POST: Create customer
router.post("/customers", customerController.createCustomer);

// GET: List all customers
router.get("/customers", customerController.getAllCustomers);

// GET: Get customer by ID
router.get("/customers/:id", customerController.getCustomerById);

// PUT: Update customer
router.put("/customers/:id", customerController.updateCustomer);

// DELETE: Delete customer
router.delete("/customers/:id", customerController.deleteCustomer);

module.exports = router;
