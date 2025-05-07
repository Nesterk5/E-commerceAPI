const express = require("express");
const app = express();
const sequelize = require("./config/db"); // <- Import DB connection
require("dotenv").config();

require("./customer/model");
require("./courier/model");
require("./admin/model");
require("./vendor/model");
require("./orders/model");
require("./delivery/model");
require("./fulfilment/model");
require("./products/model");
require("./returns/model");
require("./settlement/model");

// Middleware to parse JSON
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("API is running");
});

// Test DB connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected...");
  })
  .catch((err) => {
    console.error("Unable to connect to database:", err);
  });

// Sync models to DB
sequelize
  .sync({ alter: true })
  .then(() => console.log("All models were synchronized!"))
  .catch((err) => console.error("Error syncing models:", err));

// Auth Endpoints
const authRoutes = require("./auth/authController");
app.use(authRoutes);

// Customer Endpoints
const customerView = require("./customer/view");
app.use("/", customerView);

const courierController = require("./courier/controller");

// Courier Endpoints
app.post("/couriers", courierController.createCourier);
app.get("/couriers", courierController.getAllCouriers);
app.get("/couriers/:id", courierController.getCourierById);
app.put("/couriers/:id", courierController.updateCourier);
app.delete("/couriers/:id", courierController.deleteCourier);

const vendorController = require("./vendor/controller");

// Vendor Endpoints
app.post("/vendors", vendorController.createVendor);
app.get("/vendors", vendorController.getAllVendors);
app.get("/vendors/:id", vendorController.getVendorById);
app.put("/vendors/:id", vendorController.updateVendor);
app.delete("/vendors/:id", vendorController.deleteVendor);

const adminController = require("./admin/controller");

// Admin Endpoints
app.post("/admins", adminController.createAdmin);
app.get("/admins", adminController.getAllAdmins);
app.get("/admins/:id", adminController.getAdminById);
app.put("/admins/:id", adminController.updateAdmin);
app.delete("/admins/:id", adminController.deleteAdmin);

const orderController = require("./orders/controller");

// Order Endpoints
app.post("/orders", orderController.createOrder);
app.get("/orders", orderController.getAllOrders);
app.get("/orders/:id", orderController.getOrderById);
app.put("/orders/:id", orderController.updateOrder);
app.delete("/orders/:id", orderController.deleteOrder);

const deliveryController = require("./delivery/controller");

// Delivery Endpoints
app.post("/deliveries", deliveryController.createDelivery);
app.get("/deliveries", deliveryController.getAllDeliveries);
app.get("/deliveries/:id", deliveryController.getDeliveryById);
app.put("/deliveries/:id", deliveryController.updateDelivery);
app.delete("/deliveries/:id", deliveryController.deleteDelivery);

const fulfilmentController = require("./fulfilment/controller");

// Fulfillment Endpoints
app.post("/fulfilments", fulfilmentController.createFulfilment);
app.get("/fulfilments", fulfilmentController.getAllFulfilments);
app.get("/fulfilments/:id", fulfilmentController.getFulfilmentById);
app.put("/fulfilments/:id", fulfilmentController.updateFulfilment);
app.delete("/fulfilments/:id", fulfilmentController.deleteFulfilment);

const productController = require("./products/controller");

// Product Endpoints
app.post("/products", productController.createProduct);
app.get("/products", productController.getAllProducts);
app.get("/products/:id", productController.getProductById);
app.put("/products/:id", productController.updateProduct);
app.delete("/products/:id", productController.deleteProduct);

const returnController = require("./returns/controller");

// Return Endpoints
app.post("/returns", returnController.createReturn);
app.get("/returns", returnController.getAllReturns);
app.get("/returns/:id", returnController.getReturnById);
app.put("/returns/:id", returnController.updateReturn);
app.delete("/returns/:id", returnController.deleteReturn);

const settlementController = require("./settlement/controller");

// Settlement Endpoints
app.post("/settlements", settlementController.createSettlement);
app.get("/settlements", settlementController.getAllSettlements);
app.get("/settlements/:id", settlementController.getSettlementById);
app.put("/settlements/:id", settlementController.updateSettlement);
app.delete("/settlements/:id", settlementController.deleteSettlement);

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on http://127.0.0.1:${PORT}`);
});
