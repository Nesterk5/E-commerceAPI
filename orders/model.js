const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Customer = require("../customer/model");
const Vendor = require("../vendor/model");

const Order = sequelize.define(
  "Order",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    order_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    order_status: {
      type: DataTypes.ENUM(
        "pending",
        "confirmed",
        "shipped",
        "delivered",
        "cancelled"
      ),
      defaultValue: "pending",
    },
    payment_status: {
      type: DataTypes.ENUM("pending", "paid", "failed"),
      defaultValue: "pending",
    },
    total_amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    // Foreign Key - Customer
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "customers", // table name
        key: "id",
      },
    },
    // Foreign Key - Vendor
    vendor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "vendors", // table name
        key: "id",
      },
    },
  },
  {
    timestamps: true,
    tableName: "orders",
  }
);

//Associations (Foreign Keys)
// Order.belongsTo(Customer, { foreignKey: "customer_id", as: "customer" });
// Order.belongsTo(Vendor, { foreignKey: "vendor_id", as: "vendor" });

module.exports = Order;
