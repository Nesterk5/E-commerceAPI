const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
require("../customer/model");
require("../courier/model");
require("../orders/model");

const Delivery = sequelize.define(
  "Delivery",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    delivery_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    delivery_status: {
      type: DataTypes.ENUM("pending", "in transit", "delivered", "cancelled"),
      defaultValue: "pending",
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
    courier_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "couriers", // table name
        key: "id",
      },
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "orders",
        key: "id",
      },
    },
    tracking_number: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "deliveries",
  }
);

module.exports = Delivery;
