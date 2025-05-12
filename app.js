const express = require("express");
const app = express();
const sequelize = require("./config/db");
require("dotenv").config();
const cors = require("cors");
const setupSwagger = require("./swagger");



// Model imports
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
require("./auth/user.model");

// Middlewares
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("API is running");
});


// Test DB connection
sequelize
  .authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.error("Unable to connect to database:", err));


  // Sync models to DB
sequelize
  .sync({ alter: true })
  .then(() => console.log("All models were synchronized!"))
  .catch((err) => console.error("Error syncing models:", err));


  // Routes mounting
const authRoutes = require("./auth/authController");
app.use(authRoutes);

const protectedRoute = require("./auth/protectedRoute");
app.use("/protected", protectedRoute);

const customerRoutes = require("./customer/controller");
app.use("/customers", customerRoutes);

const adminRoutes = require("./admin/controller");
app.use("/admins", adminRoutes);

const courierRoutes = require("./courier/controller");
app.use("/couriers", courierRoutes);

const vendorRoutes = require("./vendor/controller");
app.use("/vendors", vendorRoutes);

const orderRoutes = require("./orders/controller");
app.use("/orders", orderRoutes);

const deliveryRoutes = require("./delivery/controller");
app.use("/deliveries", deliveryRoutes);

const fulfilmentRoutes = require("./fulfilment/controller");
app.use("/fulfilments", fulfilmentRoutes);

const productRoutes = require("./products/controller");
app.use("/products", productRoutes);

const returnRoutes = require("./returns/controller");
app.use("/returns", returnRoutes);

const settlementRoutes = require("./settlement/controller");
app.use("/settlements", settlementRoutes);

// Swagger docs
setupSwagger(app);

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on http://127.0.0.1:${PORT}`);
});
